let produtos = [
    {
        id: 1,
        nome: "Produto 1",
        preco: 10.00
    },
    {
        id: 2,
        nome: "Produto 2",
        preco: 20.00
    }
];

// Função para buscar um produto pelo ID
function buscaProduto(id) {
    return produtos.findIndex(produto => produto.id === Number(id));
}

// Obter todos os produtos
export const getProdutos = (req, res) => {
    res.status(200).json(produtos);
};

// Obter produto por ID
export const getProdutoById = (req, res) => {
    const index = buscaProduto(req.params.id);
    if (index === -1) {
        return res.status(404).json({ mensagem: 'Produto não encontrado' });
    }
    res.status(200).json(produtos[index]);
};

// Criar novo produto
export const createProduto = (req, res) => {
    const { nome, preco } = req.body;
    const novoId = produtos.length ? produtos[produtos.length - 1].id + 1 : 1;
    const novoProduto = { id: novoId, nome, preco };
    produtos.push(novoProduto);
    res.status(201).json(novoProduto);
};

// Atualizar produto
export const updateProduto = (req, res) => {
    const { id } = req.params;
    const { nome, preco } = req.body;
    const index = buscaProduto(id);
    if (index === -1) {
        return res.status(404).json({ mensagem: 'Produto não encontrado' });
    }
    produtos[index] = { id: Number(id), nome, preco };
    res.status(200).json(produtos[index]);
};

// Deletar produto
export const deleteProduto = (req, res) => {
    const index = buscaProduto(req.params.id);
    if (index === -1) {
        return res.status(404).json({ mensagem: 'Produto não encontrado' });
    }
    produtos.splice(index, 1);
    res.status(204).end();
};
