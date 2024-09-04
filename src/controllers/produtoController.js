import pool from '../db.js';

// Obter todos os produtos
export const getProdutos = async (req, res) => {
  try {
    const resultado = await pool.query('SELECT * FROM Produto');
    res.status(200).json(resultado.rows);
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
};

// Obter produto por ID
export const getProdutoById = async (req, res) => {
  const { id } = req.params;
  try {
    const resultado = await pool.query('SELECT * FROM Produto WHERE id = $1', [id]);
    res.status(200).json(resultado.rows[0]);
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
};

// Criar novo produto
export const createProduto = async (req, res) => {
  const { nome, preco } = req.body;
  try {
    const resultado = await pool.query(
      'INSERT INTO Produto (nome, preco) VALUES ($1, $2) RETURNING *',
      [nome, preco]
    );
    res.status(201).json(resultado.rows[0]);
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
};

// Atualizar produto
export const updateProduto = async (req, res) => {
  const { id } = req.params;
  const { nome, preco } = req.body;
  try {
    const resultado = await pool.query(
      'UPDATE Produto SET nome = $1, preco = $2 WHERE id = $3 RETURNING *',
      [nome, preco, id]
    );
    res.status(200).json(resultado.rows[0]);
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
};

// Deletar produto
export const deleteProduto = async (req, res) => {
  const { id } = req.params;
  try {
    const resultado = await pool.query('DELETE FROM Produto WHERE id = $1 RETURNING *', [id]);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
};
