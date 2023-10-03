import express from "express";
import { store } from "../context.js";
import exampleService from "../services/exampleService.js";
import { db } from "../db.js";

const getAll = async (req: express.Request, res: express.Response) => {
  const all = await db.author.findMany();
  return res.status(200).json(all);
};

const getById = async (req: express.Request, res: express.Response) => {
  const { id } = req.params;
  const author = await db.author.findUnique({
    where: {
      id,
    },
  });
  return res.status(200).json(author);
};

const create = async (req: express.Request, res: express.Response) => {
  const { name } = req.body;
  const author = await db.author.create({
    data: {
      name,
    },
  });
  return res.status(200).json(author);
};

const update = async (req: express.Request, res: express.Response) => {
  const { id } = req.params;
  const { name } = req.body;
  const author = await db.author.update({
    where: {
      id,
    },
    data: {
      name,
    },
  });
  return res.status(200).json(author);
};

const remove = async (req: express.Request, res: express.Response) => {
  const { id } = req.params;
  const author = await db.author.delete({
    where: {
      id,
    },
  });
  return res.status(200).json(author);
};

export default {
  getAll,
  getById,
  create,
  update,
  remove,
};
