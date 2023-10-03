import express from "express";
import { db } from "../db.js";

const getAll = async (req: express.Request, res: express.Response) => {
  const all = await db.lesson.findMany();
  return res.status(200).json(all);
};

const getLatest = async (req: express.Request, res: express.Response) => {
  const latest = await db.lesson.findMany({
    take: 2,
    orderBy: {
      createdAt: "desc",
    },
  });
  return res.status(200).json(latest);
};

const getById = async (req: express.Request, res: express.Response) => {
  const { id } = req.params;
  const lesson = await db.lesson.findUnique({
    where: {
      id,
    },
  });
  return res.status(200).json(lesson);
};

const create = async (req: express.Request, res: express.Response) => {
  const { title, authorId, categoryId, audioUrl, documentUrl, pdfUrl } =
    req.body;
  const lesson = await db.lesson.create({
    data: {
      title,
      authorId,
      audioUrl,
      documentUrl,
      pdfUrl,
      categoryId,
    },
  });
  return res.status(200).json(lesson);
};

const update = async (req: express.Request, res: express.Response) => {
  const { id } = req.params;
  const { title, authorId, categoryId, audioUrl, documentUrl, pdfUrl } =
    req.body;
  const lesson = await db.lesson.update({
    where: {
      id,
    },
    data: {
      title,
      authorId,
      audioUrl,
      documentUrl,
      pdfUrl,
      categoryId,
    },
  });
  return res.status(200).json(lesson);
};

const remove = async (req: express.Request, res: express.Response) => {
  const { id } = req.params;
  const lesson = await db.lesson.delete({
    where: {
      id,
    },
  });
  return res.status(200).json(lesson);
};

export default {
  getAll,
  getLatest,
  getById,
  create,
  update,
  remove,
};
