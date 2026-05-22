// backend/src/middleware/errorHandler.js

function errorHandler(err, req, res, next) {
  console.error(`[ERROR] ${req.method} ${req.path}:`, err.message);

  // Multer file size error
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(413).json({ error: 'File too large. Maximum size is 10MB.' });
  }

  // Multer file type error
  if (err.message?.startsWith('Invalid file type')) {
    return res.status(415).json({ error: err.message });
  }

  // Prisma not found
  if (err.code === 'P2025') {
    return res.status(404).json({ error: 'Record not found.' });
  }

  // Prisma unique constraint
  if (err.code === 'P2002') {
    return res.status(409).json({ error: 'A record with this value already exists.' });
  }

  const status = err.status || err.statusCode || 500;
  res.status(status).json({
    error: status === 500 ? 'Internal server error' : err.message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
}

module.exports = { errorHandler };