const express = require("express");
const server = express();

server.use(express.json());

const usuarios = [" Leandro", "Flavio", "Fabiano", "Marcos"];

server.use((req, res, next) => {
  console.time("Request: ");
  console.log(`Metodo: ${req.method}; URL ${req.url} `);

  next();
  console.timeEnd("Request: ");
});

function checarUsuarioExiste(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({ error: "Nome do usuario é obrigatorio" });
  }
  return next();
}

function checarNumeroArrayExiste(req, res, next) {
  if (!req.params.index) {
    return res.status(400).json({ error: "Usuario não existe" });
  }

  req.usuarios = usuarios;
  return next();
}

//LISTANDO TODOS USUARIOS
server.get("/usuarios", (req, res) => {
  return res.json(usuarios);
});

//LISTANDO UNICO USUARIO
server.get("/usuarios/:index", (req, res) => {
  const { index } = req.params;

  return res.json(req.usuarios);
});

//CRIANDO USUARIO
server.post("/usuarios", checarUsuarioExiste, (req, res) => {
  const { name } = req.body;
  usuarios.push(name);
  return res.json(usuarios);
});

//EDITANDO USUARIO
server.put(
  "/usuarios/:index",
  checarUsuarioExiste,
  checarNumeroArrayExiste,
  (req, res) => {
    const { index } = req.params;
    const { name } = req.body;

    usuarios[index] = name;

    return res.json(usuarios);
  }
);

//DELETAR USUARIO
server.delete("/usuarios/:index", checarNumeroArrayExiste, (req, res) => {
  const { index } = req.params;

  usuarios.splice(index, 1);

  return res.send();
});

//Query params = ?nome=leandro
// server.get("/teste", (req, res) => {
//   const nome = req.query.nome;
//   return res.json({ messege: `se lenhar, ${nome}` });
// });

// // Route params = /users/1
// server.get("/teste2/:id", (req, res) => {
//   const { id } = req.params;
//   return res.json({ messege: `Seu id = , ${id}` });
// });

// // Request body = {"nome":"Leandro", "email": "leandro.sallesls@hotmail.com" }
// server.get("/usuarios/:index", (req, res) => {
//   const { index } = req.params;
//   return res.json(usuarios[index]);
// });

server.listen(3000);
