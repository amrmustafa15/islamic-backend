import express from "express";
import authorsController from "../controllers/authorsController.js";

const router = express.Router();
router.get("/", authorsController.getAll);
router.get("/:id", authorsController.getById);
router.put("/", authorsController.create);
router.post("/:id", authorsController.update);
router.delete("/:id", authorsController.remove);

export default router;
