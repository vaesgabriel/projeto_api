import pool from '../db.js';

// Obter todos os usuários
export const getUsuarios = async (req, res) => {
  try {
    const resultado = await pool.query('SELECT * FROM Usuario');
    res.status(200).json(resultado.rows);
  } catch (err) {
    console.error('Erro ao obter usuários:', err); // Adicionei log para depuração
    res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
};

// Obter usuário por ID
export const getUsuarioById = async (req, res) => {
  const { id } = req.params;
  try {
    const resultado = await pool.query('SELECT * FROM Usuario WHERE id = $1', [id]);
    res.status(200).json(resultado.rows[0]);
  } catch (err) {
    console.error('Erro ao obter usuário por ID:', err); // Adicionei log para depuração
    res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
};

// Criar novo usuário
export const createUsuario = async (req, res) => {
  const { nome, password, email } = req.body;

  try {
    const resultado = await pool.query(
      'INSERT INTO Usuario (nome, password, email) VALUES ($1, $2, $3) RETURNING *',
      [nome, password, email]
    );
    res.status(201).json(resultado.rows[0]);
  } catch (err) {
    console.error('Erro ao criar usuário:', err); // Adicionei log para depuração
    res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
};

// Atualizar usuário
export const updateUsuario = async (req, res) => {
  const { id } = req.params;
  const { nome, email } = req.body;

  try {
    const resultado = await pool.query(
      'UPDATE Usuario SET nome = $1, email = $2 WHERE id = $3 RETURNING *',
      [nome, email, id]
    );
    res.status(200).json(resultado.rows[0]);
  } catch (err) {
    console.error('Erro ao atualizar usuário:', err); // Adicionei log para depuração
    res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
};

// Deletar usuário
export const deleteUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    const resultado = await pool.query('DELETE FROM Usuario WHERE id = $1 RETURNING *', [id]);
    res.status(204).end();
  } catch (err) {
    console.error('Erro ao deletar usuário:', err); // Adicionei log para depuração
    res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
};
