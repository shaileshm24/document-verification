// backend/src/services/ai/gemini.js
// Gemini (Google) implementation of the AI extraction interface

const { GoogleGenerativeAI } = require('@google/generative-ai');
const PROMPTS = require('./prompts');
const { isPdf } = require('../verifiers/fileLoader');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-pro';

/**
 * Build Gemini content parts for a document.
 * Gemini uses inlineData for both images and PDFs.
 */
function buildGeminiParts(buffer, mimeType, documentType) {
  const prompt = PROMPTS[documentType];
  if (!prompt) throw new Error(`Unknown document type: ${documentType}`);

  return [
    {
      inlineData: {
        mimeType: mimeType, // e.g., 'image/jpeg', 'application/pdf'
        data: buffer.toString('base64')
      }
    },
    {
      text: prompt
    }
  ];
}

/**
 * Extract document fields using Gemini Vision.
 * @param {Buffer} buffer - Document buffer (image or PDF)
 * @param {string} mimeType - MIME type (image/jpeg, image/png, etc., or application/pdf)
 * @param {string} documentType - Document type (aadhaar, pan, itr, employmentLetter)
 * @returns {Promise<Object>} Extracted and analysis object
 */
async function extractDocument(buffer, mimeType, documentType) {
  const model = genAI.getGenerativeModel({
    model: MODEL,
    generationConfig: {
      responseMimeType: 'application/json'
    }
  });

  const parts = buildGeminiParts(buffer, mimeType, documentType);

  try {
    const result = await model.generateContent({
      contents: [
        {
          role: 'user',
          parts: parts
        }
      ]
    });

    const response = result.response;
    const text = response.text();

    // Gemini with native JSON mode should return valid JSON directly
    // But add safety strip in case it wraps with code fence
    const jsonStr = text
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .trim();

    return JSON.parse(jsonStr);
  } catch (e) {
    console.error('Gemini extraction failed for document analysis:', e.message);
    throw new Error(`Failed to extract document via Gemini for ${documentType}`);
  }
}

module.exports = { extractDocument };
