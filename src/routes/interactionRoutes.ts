import express from "express";
import interactionController from "../controllers/interactionController.js";

const router = express.Router();
router.post("/:type", interactionController.register);
router.get("/:type", interactionController.getAll);

export default router;
