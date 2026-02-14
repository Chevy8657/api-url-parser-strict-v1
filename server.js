'use strict';
const express = require('express');
const cors = require('cors');
const { URL } = require('url');
const app = express();

app.use(cors());
app.use(express.json({ limit: '64kb' }));

app.get('/health', (req, res) => res.status(200).json({ status: 'ok' }));

app.post('/v1/parse', (req, res) => {
  const { input } = req.body;
  try {
    const parsed = new URL(input);
    res.status(200).json({
      output: {
        protocol: parsed.protocol,
        host: parsed.host,
        hostname: parsed.hostname,
        port: parsed.port,
        pathname: parsed.pathname,
        search: parsed.search,
        hash: parsed.hash,
        origin: parsed.origin,
        params: Object.fromEntries(parsed.searchParams)
      }
    });
  } catch (err) {
    res.status(400).json({ error: 'Invalid URL provided.' });
  }
});

app.listen(process.env.PORT || 10000);
