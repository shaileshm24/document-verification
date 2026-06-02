// backend/src/services/ai/openrouter.js
// OpenRouter implementation of the AI extraction interface
// OpenRouter provides access to multiple vision models through a single API

const axios = require('axios');
const PROMPTS = require('./prompts');
const { isPdf } = require('../verifiers/fileLoader');

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

    const response = await axios.post(
      OPENROUTER_API_URL,
      {
        model: OPENROUTER_MODEL,
        max_tokens: 1500,
        messages: [userMessage]
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'HTTP-Referer': process.env.OPENROUTER_REFERER || 'https://loan-fraud-detection.local',
          'X-Title': 'Loan Fraud Detection'
        }
      }
    );

    const text = response.data.choices[0].message.content;
    
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
