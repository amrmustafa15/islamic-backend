import express from "express";
import lessonsController from "../controllers/lessonsController.js";
import subLessonsController from "../controllers/subLessonsController.js";

const router = express.Router();
router.get("/", lessonsController.getAll);
router.get("/latest", lessonsController.getLatest);
router.get("/:id", lessonsController.getById);
router.put("/", lessonsController.create);
router.post("/:id", lessonsController.update);
router.delete("/:id", lessonsController.remove);

router.put("/:id/sublessons", subLessonsController.create);
router.post("/:id/sublessons/:subLessonId", subLessonsController.update);
router.delete("/:id/sublessons/:subLessonId", subLessonsController.remove);

export default router;
