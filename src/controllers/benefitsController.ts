import express from "express";
import { store } from "../context.js";
import exampleService from "../services/exampleService.js";
import { db } from "../db.js";

const getAll = async (req: express.Request, res: express.Response) => {
  const all = await db.dailyBenefit.findMany();
  return res.status(200).json(all);
};

const getById = async (req: express.Request, res: express.Response) => {
  const { id } = req.params;
  const dailyBenefit = await db.dailyBenefit.findUnique({
    where: {
      id,
    },
  });
  return res.status(200).json(dailyBenefit);
};

const create = async (req: express.Request, res: express.Response) => {
  const { title, content } = req.body;
  const dailyBenefit = await db.dailyBenefit.create({
    data: {
      title,
      content,
    },
  });
  return res.status(200).json(dailyBenefit);
};

const update = async (req: express.Request, res: express.Response) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const dailyBenefit = await db.dailyBenefit.update({
    where: {
      id,
    },
    data: {
      title,
      content,
    },
  });
  return res.status(200).json(dailyBenefit);
};

const remove = async (req: express.Request, res: express.Response) => {
  const { id } = req.params;
  const dailyBenefit = await db.dailyBenefit.delete({
    where: {
      id,
    },
  });
  return res.status(200).json(dailyBenefit);
};

export default {
  getAll,
  getById,
  create,
  update,
  remove,
};
