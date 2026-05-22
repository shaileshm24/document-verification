// backend/src/server.js
require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const loanRoutes = require('./routes/loans');
const documentRoutes = require('./routes/documents');
const fraudRoutes = require('./routes/fraud');
const statsRoutes = require('./routes/stats');
const { errorHandler } = require('./middleware/errorHandler');
const { setupWorkers } = require('./workers/documentWorker');

const app = express();
const server = http.createServer(app);

// Socket.io for real-time updates to React dashboard
const io = new Server(server, {
  cors: { origin: process.env.FRONTEND_URL || 'http://localhost:5173', methods: ['GET', 'POST'] }
});

// Make io accessible in routes
app.set('io', io);

// Middleware
// Relax CORP so the frontend can <img>-embed document thumbnails streamed
// from this API (different port = different origin).
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173' }));
app.use(morgan('dev'));
app.use(express.json({ limit: '10mb' }));

// Rate limiting — important for document analysis endpoint (Claude API costs)
const analysisLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: { error: 'Too many analysis requests, please try again later.' }
});

// Routes
app.use('/api/loans', loanRoutes);
app.use('/api/loans/:loanId/documents', analysisLimiter, documentRoutes);
app.use('/api/fraud', fraudRoutes);
app.use('/api/stats', statsRoutes);

app.get('/health', (req, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }));

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log(`Officer connected: ${socket.id}`);

  socket.on('subscribe:loan', (loanId) => {
    socket.join(`loan:${loanId}`);
    console.log(`Socket ${socket.id} subscribed to loan ${loanId}`);
  });

  socket.on('disconnect', () => {
    console.log(`Officer disconnected: ${socket.id}`);
  });
});

// Start Bull queue workers
setupWorkers(io);

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`🚀 Fraud Detection API running on port ${PORT}`);
  console.log(`📡 WebSocket server active`);
});

module.exports = { app, io };
