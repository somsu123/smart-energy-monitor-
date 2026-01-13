// ===================================
// Smart Energy Monitor - Production Server
// ===================================

const express = require('express');
const compression = require('compression');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// ===================================
// Middleware Configuration
// ===================================

// Enable Gzip compression for all responses
app.use(compression({
    filter: (req, res) => {
        if (req.headers['x-no-compression']) {
            return false;
        }
        return compression.filter(req, res);
    },
    level: 6 // Compression level (0-9)
}));

// Security headers
app.use((req, res, next) => {
    // Content Security Policy
    res.setHeader(
        'Content-Security-Policy',
        "default-src 'self'; " +
        "script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; " +
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
        "font-src 'self' https://fonts.gstatic.com; " +
        "connect-src 'self'; " +
        "img-src 'self' data:;"
    );

    // Other security headers
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');

    next();
});

// ===================================
// Static File Serving with Caching
// ===================================

// Serve static files with appropriate cache headers
app.use(express.static(path.join(__dirname), {
    maxAge: '1d', // Cache static assets for 1 day
    etag: true,
    lastModified: true,
    setHeaders: (res, filepath) => {
        // Cache HTML files for 1 hour
        if (filepath.endsWith('.html')) {
            res.setHeader('Cache-Control', 'public, max-age=3600');
        }
        // Cache CSS and JS for 1 day
        else if (filepath.endsWith('.css') || filepath.endsWith('.js')) {
            res.setHeader('Cache-Control', 'public, max-age=86400');
        }
        // Cache fonts for 1 week
        else if (filepath.match(/\.(woff|woff2|ttf|otf)$/)) {
            res.setHeader('Cache-Control', 'public, max-age=604800');
        }
    }
}));

// ===================================
// Routes
// ===================================

// Health check endpoint for Render
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// Serve index.html for root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// 404 handler - redirect to home
app.use((req, res) => {
    res.redirect('/');
});

// ===================================
// Error Handler
// ===================================

app.use((err, req, res, next) => {
    console.error('Server Error:', err.stack);
    res.status(500).json({
        error: 'Internal Server Error',
        message: process.env.NODE_ENV === 'production'
            ? 'Something went wrong'
            : err.message
    });
});

// ===================================
// Server Startup
// ===================================

app.listen(PORT, () => {
    console.log('╔════════════════════════════════════════════╗');
    console.log('║   Smart Energy Monitor - Server Running   ║');
    console.log('╚════════════════════════════════════════════╝');
    console.log('');
    console.log(`🚀 Server is running on port ${PORT}`);
    console.log(`🌐 Local URL: http://localhost:${PORT}`);
    console.log(`📊 Health check: http://localhost:${PORT}/health`);
    console.log(`⚡ Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log('');
    console.log('Press Ctrl+C to stop the server');
    console.log('═══════════════════════════════════════════════');
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('\nSIGINT signal received: closing HTTP server');
    process.exit(0);
});
