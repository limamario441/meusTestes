import express from 'express';
import dotenv from 'dotenv';
import { pool } from './db.js';
import cors from 'cors';



dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.post('/cartoes', async (req, res) => {
  const { numero, nome, validade, cvv } = req.body;

  if (!numero || !nome || !validade || !cvv) {
    return res.status(400).json({ erro: 'Preencha todos os campos' });
  }

  try {
    await pool.query(
      'INSERT INTO cartoes (numero, nome, validade, cvv) VALUES (?, ?, ?, ?)',
      [numero, nome, validade, cvv]
    );
    res.status(201).json({ mensagem: 'Cartão cadastrado com sucesso!' });
  } catch (err) {
    console.error('Erro ao cadastrar cartão:', err);
    res.status(500).json({ erro: 'Erro ao cadastrar cartão' });
  }
});

// Rota inicial
app.get('/', (req, res) => {
  res.send('API Node.js + MySQL funcionando! 🚀');
});

// CADASTRO
app.post('/usuarios', async (req, res) => {
  const { nome, email, senha } = req.body;
  if (!nome || !email || !senha) {
    return res.status(400).json({ erro: 'Preencha todos os campos' });
  }

  try {
    await pool.query(
      'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)',
      [nome, email, senha]
    );
    res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso!' });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao cadastrar' });
  }
});

// LOGIN
app.post('/login', async (req, res) => {
  const { email, senha } = req.body;
  if (!email || !senha) {
    return res.status(400).json({ erro: 'Preencha todos os campos' });
  }

  try {
    const [rows] = await pool.query(
      'SELECT * FROM usuarios WHERE email = ? AND senha = ?',
      [email, senha]
    );
    if (rows.length === 0) {
      return res.status(401).json({ erro: 'Email ou senha incorretos' });
    }
    res.json({ mensagem: 'Login realizado com sucesso!', usuario: rows[0] });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao fazer login' });
  }
});

app.post('/cartoes', async (req, res) => {
  const { numero, nome, validade, cvv } = req.body;
  if (!numero || !nome || !validade || !cvv) {
    return res.status(400).json({ erro: 'Preencha todos os campos' });
  }

  try {
    await pool.query(
      'INSERT INTO cartoes (numero, nome, validade, cvv) VALUES (?, ?, ?, ?)',
      [numero, nome, validade, cvv]
    );
    res.status(201).json({ mensagem: 'Cartão cadastrado com sucesso!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao cadastrar cartão' });
  }
});

// Rodar servidor
app.listen(process.env.PORT, () => {
  console.log(`Servidor rodando em http://localhost:${process.env.PORT}`);
});
