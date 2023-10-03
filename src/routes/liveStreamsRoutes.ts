import express from "express";
import liveStreamsController from "../controllers/liveStreamsController.js";

const router = express.Router();
router.get("/all", liveStreamsController.getAll);
router.get("/:id", liveStreamsController.getById);
router.put("/", liveStreamsController.create);
router.post("/:id", liveStreamsController.update);
router.delete("/:id", liveStreamsController.remove);

export default router;
