// backend/src/services/ai/openrouter.js
// OpenRouter implementation of the AI extraction interface
// OpenRouter provides access to multiple vision models through a single API

const https = require('https');
const PROMPTS = require('./prompts');
const { isPdf } = require('../verifiers/fileLoader');

// Try to use axios if available, fall back to https module
let axios;
try {
  axios = require('axios');
} catch (e) {
  axios = null;
}

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

// Model options - choose one based on speed/cost/quality trade-off
// https://openrouter.ai/docs/models
const OPENROUTER_MODEL = process.env.OPENROUTER_MODEL || 'claude-3-5-sonnet';

/**
 * Build OpenRouter content for a document.
 * OpenRouter uses standard OpenAI-compatible format
 */
function buildOpenRouterContent(buffer, mimeType, documentType) {
  const base64Data = buffer.toString('base64');
  const prompt = PROMPTS[documentType];
  
  if (!prompt) throw new Error(`Unknown document type: ${documentType}`);

  // Determine media type
  let mediaType = 'image/jpeg';
  if (mimeType.includes('png')) mediaType = 'image/png';
  if (mimeType.includes('webp')) mediaType = 'image/webp';
  if (mimeType.includes('gif')) mediaType = 'image/gif';

  // Build message with vision capability
  return {
    role: 'user',
    content: [
      {
        type: 'image',
        source: {
          type: 'base64',
          media_type: mediaType,
          data: base64Data
        }
      },
      {
        type: 'text',
        text: prompt
      }
    ]
  };
}

/**
 * Make HTTPS request to OpenRouter API
 * Uses axios if available, falls back to native https module
 */
function makeRequest(url, options, data) {
  return new Promise((resolve, reject) => {
    if (axios) {
      // Use axios if available
      axios.post(url, data, options)
        .then(res => resolve(res.data))
        .catch(reject);
    } else {
      // Fall back to native https module
      const parsedUrl = new URL(url);
      const requestOptions = {
        hostname: parsedUrl.hostname,
        port: parsedUrl.port || 443,
        path: parsedUrl.pathname + parsedUrl.search,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        }
      };

      const req = https.request(requestOptions, (res) => {
        let responseData = '';
        res.on('data', chunk => responseData += chunk);
        res.on('end', () => {
          try {
            const parsed = JSON.parse(responseData);
            if (res.statusCode >= 200 && res.statusCode < 300) {
              resolve(parsed);
            } else {
              reject(new Error(`HTTP ${res.statusCode}: ${JSON.stringify(parsed)}`));
            }
          } catch (e) {
            reject(new Error(`Failed to parse response: ${responseData}`));
          }
        });
      });

      req.on('error', reject);
      req.write(JSON.stringify(data));
      req.end();
    }
  });
}

/**
 * Extract document fields using OpenRouter Vision API.
 * @param {Buffer} buffer - Document buffer (image or PDF)
 * @param {string} mimeType - MIME type (image/jpeg, image/png, etc., or application/pdf)
 * @param {string} documentType - Document type (aadhaar, pan, itr, employmentLetter)
 * @returns {Promise<Object>} Extracted and analysis object
 */
async function extractDocument(buffer, mimeType, documentType) {
  if (!OPENROUTER_API_KEY) {
    throw new Error('OPENROUTER_API_KEY is required for OpenRouter provider');
  }

  try {
    const userMessage = buildOpenRouterContent(buffer, mimeType, documentType);

    console.log(`📤 [OpenRouter] Sending ${documentType} to OpenRouter API...`);
    console.log(`   Model: ${OPENROUTER_MODEL}`);

    const response = await makeRequest(
      OPENROUTER_API_URL,
      {
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'HTTP-Referer': process.env.OPENROUTER_REFERER || 'https://loan-fraud-detection.local',
          'X-Title': 'Loan Fraud Detection'
        }
      },
      {
        model: OPENROUTER_MODEL,
        max_tokens: 1500,
        messages: [userMessage]
      }
    );

    const text = response.choices[0].message.content;

    // Strip Markdown code fences if present
    const jsonStr = text
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .trim();

    try {
      const result = JSON.parse(jsonStr);
      console.log(`✅ [OpenRouter] ${documentType} extracted successfully`);
      return result;
    } catch (parseError) {
      console.error('OpenRouter JSON parse failed:', parseError.message);
      console.error('Raw response:', text);
      throw new Error(`Failed to parse OpenRouter response for ${documentType}`);
    }
  } catch (error) {
    console.error('OpenRouter API error:', error.message);
    if (error.response?.data) {
      console.error('API response:', error.response.data);
    }
    throw error;
  }
}

module.exports = { extractDocument };
