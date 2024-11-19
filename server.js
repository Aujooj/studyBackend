import express from "express";

const posts = [
  {
    id: 0,
    descricao: "Uma foto teste",
    imagem: "https://placecats.com/millie/300/150",
  },
  {
    id: 1,
    descricao: "Gato brincando com um novelo de lã",
    imagem: "https://placecats.com/millie/300/150",
  },
  {
    id: 2,
    descricao: "Um gatinho dormindo",
    imagem: "https://placecats.com/millie/300/150",
  },
  {
    id: 3,
    descricao: "Gatos explorando a natureza",
    imagem: "https://placecats.com/millie/300/150",
  },
  {
    id: 4,
    descricao: "Um gato com uma expressão engraçada",
    imagem: "https://placecats.com/millie/300/150",
  },
  {
    id: 5,
    descricao: "Gatos fazendo amizade com um cachorro",
    imagem: "https://placecats.com/millie/300/150",
  },
];

function buscarPostsPorId(id) {
  return posts.findIndex((post) => {
    return post.id === Number(id);
  });
}

const app = express();
app.use(express.json());

app.listen(3000, () => {
  console.log("Server Listening ...");
});

app.get("/", (req, res) => {
  res.status(200).send("Initial Route");
});

app.get("/posts", (req, res) => {
  res.status(200).json(posts);
});

app.get("/posts/:id", (req, res) => {
  const index = buscarPostsPorId(req.params.id);
  res.status(200).json(posts[index]);
});
