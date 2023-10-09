import express from "express";
import { db } from "../db.js";

const getAll = async (req: express.Request, res: express.Response) => {
  const all = await db.socialMedia.findMany();
  return res.status(200).json(all);
};

const update = async (req: express.Request, res: express.Response) => {
  const { id } = req.params;
  const { name, url } = req.body;
  const updated = await db.socialMedia.update({
    where: {
      id,
    },
    data: {
      name,
      url,
    },
  });
  return res.status(200).json(updated);
};

export default {
  getAll,
  update,
};
