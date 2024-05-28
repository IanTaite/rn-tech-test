const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');
require('dotenv').config();

const app = express();
const PORT = 3000;

const proxy = createProxyMiddleware({
  target: 'https://angular-exercise.trunarrative.cloud/TruProxyAPI/rest/Companies/v1',
  changeOrigin: true,
  headers: {
    'x-api-key': process.env.API_KEY
  },
  logger: console
});

app.use(cors());
app.use('/api', proxy);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
