import express from "express";
import { db } from "../db.js";

const create = async (req: express.Request, res: express.Response) => {
  const { id } = req.params;
  const { title, audioUrl, documentUrl, pdfUrl } = req.body;
  const lesson = await db.subLesson.create({
    data: {
      title,
      audioUrl,
      documentUrl,
      pdfUrl,
      lessonId: id,
    },
  });
  return res.status(200).json(lesson);
};

const update = async (req: express.Request, res: express.Response) => {
  const { id, subLessonId } = req.params;
  const { title, audioUrl, documentUrl, pdfUrl } = req.body;
  const lesson = await db.subLesson.update({
    where: {
      id: subLessonId,
    },
    data: {
      title,
      audioUrl,
      documentUrl,
      pdfUrl,
    },
  });
  return res.status(200).json(lesson);
};

const remove = async (req: express.Request, res: express.Response) => {
  const { id, subLessonId } = req.params;
  const lesson = await db.subLesson.delete({
    where: {
      id: subLessonId,
    },
  });
  return res.status(200).json(lesson);
};

export default {
  create,
  update,
  remove,
};
