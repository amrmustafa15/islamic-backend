import express from "express";
import { store } from "../context.js";
import exampleService from "../services/exampleService.js";
import { db } from "../db.js";
import { InteractionType } from "@prisma/client";

const register = async (req: express.Request, res: express.Response) => {
  const type = req.params.type.toUpperCase() as InteractionType;
  const ip = req.headers["x-forwarded-for"]?.toString() || req.ip;
  const interaction = await db.interaction.create({
    data: {
      ip,
      type,
    },
  });
  return res.status(200).json(interaction);
};

const getAll = async (req: express.Request, res: express.Response) => {
  const type = req.params.type.toUpperCase() as InteractionType;
  const all = await db.interaction.findMany({
    where: {
      type,
    },
  });

  //weekly, daily, monthly
  const weekly = all.filter((i) => {
    const now = new Date();
    const weekAgo = new Date();
    weekAgo.setDate(now.getDate() - 7);
    return i.createdAt > weekAgo;
  });
  const daily = all.filter((i) => {
    const now = new Date();
    const dayAgo = new Date();
    dayAgo.setDate(now.getDate() - 1);
    return i.createdAt > dayAgo;
  });
  const monthly = all.filter((i) => {
    const now = new Date();
    const monthAgo = new Date();
    monthAgo.setDate(now.getDate() - 30);
    return i.createdAt > monthAgo;
  });
  return res.status(200).json({
    all: all.length,
    weekly: weekly.length,
    daily: daily.length,
    monthly: monthly.length,
  });
};

export default {
  getAll,
  register,
};
