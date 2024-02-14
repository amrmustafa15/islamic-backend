import express from "express";
import socialMediaController from "../controllers/socialMediaController.js";

const router = express.Router();
router.get("/", socialMediaController.getAll);
router.post("/:id", socialMediaController.update);

export default router;
