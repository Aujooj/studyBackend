import fs, { readFileSync } from "fs";
import {
  atualizarPost,
  criarPost,
  getTodosPosts,
} from "../models/postsModel.js";
import gerarDescricaoComGemini from "../services/geminiService.js";

export async function atualizarNovoPost(req, res) {
  const id = req.params.id;
  const urlImg = `http://localhost:3000/${id}.png`;
  try {
    const imgBuffer = readFileSync(`uploads/${id}.png`);
    const descricao = await gerarDescricaoComGemini(imgBuffer);
    const post = {
      imgUrl: urlImg,
      descricao: descricao,
      alt: req.body.alt,
    };
    const postCriado = await atualizarPost(id, post);
    res.status(200).json(postCriado);
  } catch (e) {
    console.error(e.message);
    res.status(500).json({ Erro: "Falha na requisição" });
  }
}

export async function listarTodosPosts(req, res) {
  const posts = await getTodosPosts();
  res.status(200).json(posts);
}

export async function postarNovoPost(req, res) {
  const novoPost = req.body;
  try {
    const postCriado = await criarPost(novoPost);
    res.status(200).json(postCriado);
  } catch (e) {
    console.error(e.message);
    res.status(500).json({ Erro: "Falha na requisição" });
  }
}

export async function uploadImagem(req, res) {
  const novoPost = {
    descricao: "",
    imgUrl: req.file.originalName,
    alt: "",
  };

  try {
    const postCriado = await criarPost(novoPost);
    const imagemAtualizada = `uploads/${postCriado.insertedId}.png`;
    fs.renameSync(req.file.path, imagemAtualizada);
    res.status(200).json(postCriado);
  } catch (e) {
    console.error(e.message);
    res.status(500).json({ Erro: "Falha na requisição" });
  }
}
