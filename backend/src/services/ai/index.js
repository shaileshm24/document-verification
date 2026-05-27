// backend/src/services/ai/index.js
// AI provider abstraction — dispatches to Claude or Gemini based on config

const claudeProvider = require('./claude');
const geminiProvider = require('./gemini');

const AI_PROVIDER = process.env.AI_PROVIDER || 'claude';

/**
 * Validates the AI_PROVIDER environment variable on startup.
 */
function validateProvider() {
  if (!['claude', 'gemini'].includes(AI_PROVIDER)) {
    throw new Error(
      `Invalid AI_PROVIDER: ${AI_PROVIDER}. Must be 'claude' or 'gemini'.`
    );
  }

  // Validate required keys
  if (AI_PROVIDER === 'claude' && !process.env.ANTHROPIC_API_KEY) {
    throw new Error('ANTHROPIC_API_KEY is required when AI_PROVIDER=claude');
  }
  if (AI_PROVIDER === 'gemini' && !process.env.GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is required when AI_PROVIDER=gemini');
  }

  console.log(`✓ AI Provider: ${AI_PROVIDER.toUpperCase()}`);
}

/**
 * Extract document fields using the configured AI provider.
 * @param {Buffer} buffer - Document buffer (image or PDF)
 * @param {string} mimeType - MIME type (image/jpeg, image/png, etc., or application/pdf)
 * @param {string} documentType - Document type (aadhaar, pan, itr, employmentLetter)
 * @returns {Promise<Object>} Extracted and analysis object { extracted, analysis }
 */
async function extractDocument(buffer, mimeType, documentType) {
  if (AI_PROVIDER === 'gemini') {
    return geminiProvider.extractDocument(buffer, mimeType, documentType);
  }
  // Default to Claude
  return claudeProvider.extractDocument(buffer, mimeType, documentType);
}

module.exports = {
  validateProvider,
  extractDocument
};
