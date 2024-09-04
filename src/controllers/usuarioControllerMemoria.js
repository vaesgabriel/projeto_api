let usuarios = [
    {
        id: 1,
        nome: "Fulano",
        email: "fulano@teste.com",
        senha: "123456"
    },
    {
        id: 2,
        nome: "Fulano2",
        email: "fulano2@teste.com",
        senha: "123456"
    }
];

function buscaUsuario(id) {
    return usuarios.findIndex(usuario => usuario.id === Number(id));
}

export const getUsuarios = (req, res) => {
    res.status(200).json(usuarios);
};

export const getUsuario = (req, res) => {
    const index = buscaUsuario(req.params.id);
    if (index === -1) {
        return res.status(404).json({ mensagem: 'Usuário não encontrado' });
    }
    res.status(200).json(usuarios[index]);
};

export const putUsuario = (req, res) => {
    const { nome, email, senha } = req.body;
    const index = buscaUsuario(req.params.id);
    if (index === -1) {
        return res.status(404).json({ mensagem: 'Usuário não encontrado' });
    }
    usuarios[index] = { id: Number(req.params.id), nome, email, senha };
    res.status(200).json(usuarios[index]);
};

export const deleteUsuario = (req, res) => {
    const index = buscaUsuario(req.params.id);
    if (index === -1) {
        return res.status(404).json({ mensagem: 'Usuário não encontrado' });
    }
    usuarios.splice(index, 1);
    res.status(200).json({ mensagem: 'Usuário removido' });
};

export const postUsuario = (req, res) => {
    const { nome, email, senha } = req.body;
    const novoId = usuarios.length ? usuarios[usuarios.length - 1].id + 1 : 1;
    const novoUsuario = { id: novoId, nome, email, senha };
    usuarios.push(novoUsuario);
    res.status(201).json(novoUsuario);
};
