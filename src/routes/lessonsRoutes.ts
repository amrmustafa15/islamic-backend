import express from "express";
import lessonsController from "../controllers/lessonsController.js";

const router = express.Router();
router.get("/all", lessonsController.getAll);
router.get("/latest", lessonsController.getLatest);
router.get("/:id", lessonsController.getById);
router.put("/", lessonsController.create);
router.post("/:id", lessonsController.update);
router.delete("/:id", lessonsController.remove);

export default router;
