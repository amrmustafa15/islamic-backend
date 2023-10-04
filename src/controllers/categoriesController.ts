import express from "express";
import { store } from "../context.js";
import exampleService from "../services/exampleService.js";
import { db } from "../db.js";

const getAll = async (req: express.Request, res: express.Response) => {
  const all = await db.category.findMany();
  return res.status(200).json(all);
};

const getById = async (req: express.Request, res: express.Response) => {
  const { id } = req.params;
  const category = await db.category.findUnique({
    where: {
      id,
    },
    include: { lessons: { include: { subLessons: true } } },
  });
  return res.status(200).json(category);
};

const create = async (req: express.Request, res: express.Response) => {
  const { name } = req.body;
  const category = await db.category.create({
    data: {
      name,
    },
  });
  return res.status(200).json(category);
};

const update = async (req: express.Request, res: express.Response) => {
  const { id } = req.params;
  const { name } = req.body;
  const category = await db.category.update({
    where: {
      id,
    },
    data: {
      name,
    },
  });
  return res.status(200).json(category);
};

const remove = async (req: express.Request, res: express.Response) => {
  const { id } = req.params;
  const category = await db.category.delete({
    where: {
      id,
    },
  });
  return res.status(200).json(category);
};

export default {
  getAll,
  getById,
  create,
  update,
  remove,
};
