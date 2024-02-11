import express from "express";

import {
  addCollaborator,
  deleteCollaborator,
  deleteProject,
  editProject,
  getProject,
  getProjects,
  newProject,
  findCollaborator,
} from "../controllers/projectController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.get("/", checkAuth, getProjects);
router.post("/", checkAuth, newProject);

router
  .route("/:id")
  .get(checkAuth, getProject)
  .put(checkAuth, editProject)
  .delete(checkAuth, deleteProject);

router.post("/collaborators", checkAuth, findCollaborator);
router.post("/collaborators/:id", checkAuth, addCollaborator);
router.delete("/collaborators/:id", checkAuth, deleteCollaborator);

export default router;
