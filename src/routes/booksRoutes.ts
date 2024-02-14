import express from "express";
import booksController from "../controllers/booksController.js";

const router = express.Router();
router.get("/", booksController.getAll);
router.get("/:id", booksController.getById);
router.put("/", booksController.create);
router.post("/:id", booksController.update);
router.delete("/:id", booksController.remove);

export default router;
