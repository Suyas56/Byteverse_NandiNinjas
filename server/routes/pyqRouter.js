import express from "express";
import { addPYQ, getAllPYQs } from "../controllers/pyqController.js";
import { isAuthenticated, isAuthorized } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/admin/add", isAuthenticated, isAuthorized("Admin"), addPYQ);
router.get("/all", isAuthenticated, getAllPYQs);

export default router;