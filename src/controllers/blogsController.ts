import express from "express";
import { store } from "../context.js";
import exampleService from "../services/exampleService.js";
import { db } from "../db.js";

const getAll = async (req: express.Request, res: express.Response) => {
  const all = await db.blog.findMany();
  return res.status(200).json(all);
};

const getById = async (req: express.Request, res: express.Response) => {
  const { id } = req.params;
  const blog = await db.blog.findUnique({
    where: {
      id,
    },
  });
  return res.status(200).json(blog);
};

const create = async (req: express.Request, res: express.Response) => {
  const { title, author, content } = req.body;
  const blog = await db.blog.create({
    data: {
      title,
      author,
      content,
    },
  });
  return res.status(200).json(blog);
};

const update = async (req: express.Request, res: express.Response) => {
  const { id } = req.params;
  const { title, author, content } = req.body;
  const blog = await db.blog.update({
    where: {
      id,
    },
    data: {
      title,
      author,
      content,
    },
  });
  return res.status(200).json(blog);
};

const remove = async (req: express.Request, res: express.Response) => {
  const { id } = req.params;
  const blog = await db.blog.delete({
    where: {
      id,
    },
  });
  return res.status(200).json(blog);
};

export default {
  getAll,
  getById,
  create,
  update,
  remove,
};
