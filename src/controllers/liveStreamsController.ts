import express from "express";
import { store } from "../context.js";
import exampleService from "../services/exampleService.js";
import { db } from "../db.js";

const getAll = async (req: express.Request, res: express.Response) => {
  const all = await db.liveStream.findMany();
  return res.status(200).json(all);
};

const getById = async (req: express.Request, res: express.Response) => {
  const { id } = req.params;
  const liveStream = await db.liveStream.findUnique({
    where: {
      id,
    },
  });
  return res.status(200).json(liveStream);
};

const create = async (req: express.Request, res: express.Response) => {
  const { title, date, time, location, streamUrl } = req.body;
  const liveStream = await db.liveStream.create({
    data: {
      title,
      date,
      time,
      location,
      streamUrl,
    },
  });
  return res.status(200).json(liveStream);
};

const update = async (req: express.Request, res: express.Response) => {
  const { id } = req.params;
  const { title, date, time, location, streamUrl } = req.body;
  const liveStream = await db.liveStream.update({
    where: {
      id,
    },
    data: {
      title,
      date,
      time,
      location,
      streamUrl,
    },
  });
  return res.status(200).json(liveStream);
};

const remove = async (req: express.Request, res: express.Response) => {
  const { id } = req.params;
  const liveStream = await db.liveStream.delete({
    where: {
      id,
    },
  });
  return res.status(200).json(liveStream);
};

export default {
  getAll,
  getById,
  create,
  update,
  remove,
};
