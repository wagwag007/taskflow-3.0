let tarefas = [];

function responder(res, status, dados) {
  res.status(status).json(dados);
}

function idDaRequisicao(req) {
  const partes = req.url.split('?')[0].split('/').filter(Boolean);
  const id = Number(partes.at(-1));
  return Number.isInteger(id) && id > 0 ? id : null;
}

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(204).end();

  const id = idDaRequisicao(req);
  const corpo = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});

  if (req.method === 'GET') return responder(res, 200, tarefas);

  if (req.method === 'POST') {
    const novaTarefa = { ...corpo, id: tarefas.reduce((maiorId, tarefa) => Math.max(maiorId, tarefa.id), 0) + 1 };
    tarefas = [...tarefas, novaTarefa];
    return responder(res, 201, novaTarefa);
  }

  if (!id) return responder(res, 400, { erro: 'Informe o id da tarefa.' });

  if (req.method === 'PATCH') {
    const tarefa = tarefas.find((item) => item.id === id);
    if (!tarefa) return responder(res, 404, { erro: 'Tarefa não encontrada.' });
    Object.assign(tarefa, corpo, { id });
    return responder(res, 200, tarefa);
  }

  if (req.method === 'DELETE') {
    tarefas = tarefas.filter((tarefa) => tarefa.id !== id);
    return res.status(204).end();
  }

  return responder(res, 405, { erro: 'Método não permitido.' });
}