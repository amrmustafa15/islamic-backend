import express from "express";
import blogsController from "../controllers/blogsController.js";

const router = express.Router();
router.get("/", blogsController.getAll);
router.get("/:id", blogsController.getById);
router.put("/", blogsController.create);
router.post("/:id", blogsController.update);
router.delete("/:id", blogsController.remove);

export default router;
