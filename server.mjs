import { createServer } from 'node:http';
import handler from './api/tarefas.js';

const port = 3000;

createServer(async (request, response) => {
  const body = await new Promise((resolve) => {
    let data = '';
    request.on('data', (chunk) => {
      data += chunk;
    });
    request.on('end', () => resolve(data));
  });

  const res = {
    statusCode: 200,
    headers: {},
    setHeader(name, value) {
      this.headers[name] = value;
    },
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(data) {
      response.writeHead(this.statusCode, { ...this.headers, 'Content-Type': 'application/json' });
      response.end(JSON.stringify(data));
    },
    end() {
      response.writeHead(this.statusCode, this.headers);
      response.end();
    },
  };

  try {
    await handler({ method: request.method, url: request.url, body }, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro interno da API.' });
  }
}).listen(port, () => {
  console.log(`API local rodando em http://localhost:${port}`);
});