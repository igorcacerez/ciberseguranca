require('dotenv').config();
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const { testConnection } = require('./config/database');

const app = express();
const PORT = process.env.PORT || 3000;

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Session
app.use(session({
  secret: process.env.SESSION_SECRET || 'ethical-hacker-secret-key-2024',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 24 * 60 * 60 * 1000 } // 24h
}));

// Routes
app.use('/', require('./routes/index'));
app.use('/player', require('./routes/player'));
app.use('/mission', require('./routes/missions'));

// 404
app.use((req, res) => {
  res.status(404).redirect('/game');
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Erro interno do servidor');
});

// Start
testConnection().then(() => {
  app.listen(PORT, () => {
    console.log(`\n╔══════════════════════════════════════════╗`);
    console.log(`║  Ethical Hacker Game rodando na porta ${PORT}  ║`);
    console.log(`║  Acesse: http://localhost:${PORT}            ║`);
    console.log(`╚══════════════════════════════════════════╝\n`);
  });
});
