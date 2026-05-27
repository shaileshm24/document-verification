// backend/src/services/ai/claude.js
// Claude (Anthropic) implementation of the AI extraction interface

const Anthropic = require('@anthropic-ai/sdk');
const PROMPTS = require('./prompts');
const { isPdf } = require('../verifiers/fileLoader');

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const MODEL = process.env.CLAUDE_MODEL || 'claude-opus-4-6';

/**
 * Build Claude content block for a document.
 * Images use the image source, PDFs use the document source.
 */
function buildClaudeContent(buffer, mimeType) {
  if (isPdf(mimeType)) {
    return {
      type: 'document',
      source: {
        type: 'base64',
        media_type: 'application/pdf',
        data: buffer.toString('base64')
      }
    };
  }
  // For images, preprocessing is done upstream in buildDocumentContent
  return {
    type: 'image',
    source: {
      type: 'base64',
      media_type: 'image/jpeg',
      data: buffer.toString('base64')
    }
  };
}

/**
 * Extract document fields using Claude Vision.
 * @param {Buffer} buffer - Document buffer (image or PDF)
 * @param {string} mimeType - MIME type (image/jpeg, image/png, etc., or application/pdf)
 * @param {string} documentType - Document type (aadhaar, pan, itr, employmentLetter)
 * @returns {Promise<Object>} Extracted and analysis object
 */
async function extractDocument(buffer, mimeType, documentType) {
  const prompt = PROMPTS[documentType];
  if (!prompt) throw new Error(`Unknown document type: ${documentType}`);

  const docContent = buildClaudeContent(buffer, mimeType);

  const response = await anthropic.messages.create({
    model: MODEL,
    max_tokens: 1500,
    messages: [
      {
        role: 'user',
        content: [docContent, { type: 'text', text: prompt }]
      }
    ]
  });

  const text = response.content[0].text;
  // Strip Markdown code fences if present
  const jsonStr = text
    .replace(/```json\n?/g, '')
    .replace(/```\n?/g, '')
    .trim();

  try {
    return JSON.parse(jsonStr);
  } catch (e) {
    console.error('Claude JSON parse failed for document analysis:', e.message);
    console.error('Raw response:', text);
    throw new Error(`Failed to parse Claude response for ${documentType}`);
  }
}

module.exports = { extractDocument };
