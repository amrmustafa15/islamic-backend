import express from "express";
import benifitsController from "../controllers/benefitsController.js";

const router = express.Router();
router.get("/", benifitsController.getAll);
router.get("/:id", benifitsController.getById);
router.put("/", benifitsController.create);
router.post("/:id", benifitsController.update);
router.delete("/:id", benifitsController.remove);

export default router;
