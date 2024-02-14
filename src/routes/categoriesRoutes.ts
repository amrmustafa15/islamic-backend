import express from "express";
import categoriesController from "../controllers/categoriesController.js";

const router = express.Router();
router.get("/", categoriesController.getAll);
router.get("/:id", categoriesController.getById);
router.put("/", categoriesController.create);
router.post("/:id", categoriesController.update);
router.delete("/:id", categoriesController.remove);

export default router;
