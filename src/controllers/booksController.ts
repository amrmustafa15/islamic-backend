import express from "express";
import { store } from "../context.js";
import exampleService from "../services/exampleService.js";
import { db } from "../db.js";

const getAll = async (req: express.Request, res: express.Response) => {
  const all = await db.book.findMany();
  return res.status(200).json(all);
};

const getById = async (req: express.Request, res: express.Response) => {
  const { id } = req.params;
  const book = await db.book.findUnique({
    where: {
      id,
    },
  });
  return res.status(200).json(book);
};

const create = async (req: express.Request, res: express.Response) => {
  const { title, author, coverImageUrl, downloadUrl } = req.body;
  const book = await db.book.create({
    data: {
      title,
      author,
      coverImageUrl,
      downloadUrl,
    },
  });
  return res.status(200).json(book);
};

const update = async (req: express.Request, res: express.Response) => {
  const { id } = req.params;
  const { title, author, coverImageUrl, downloadUrl } = req.body;
  const book = await db.book.update({
    where: {
      id,
    },
    data: {
      title,
      author,
      coverImageUrl,
      downloadUrl,
    },
  });
  return res.status(200).json(book);
};

const remove = async (req: express.Request, res: express.Response) => {
  const { id } = req.params;
  const book = await db.book.delete({
    where: {
      id,
    },
  });
  return res.status(200).json(book);
};

export default {
  getAll,
  getById,
  create,
  update,
  remove,
};
