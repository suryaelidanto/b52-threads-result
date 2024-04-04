import * as express from "express";
import ThreadsController from "../controllers/ThreadsControllers";
import AuthControllers from "../controllers/AuthControllers";
import AuthenticationMiddleware from "../middlewares/Auth";
import { upload } from "../middlewares/Upload";
import "dotenv/config";
import cloudinary from "../libs/cloudinary";

const router = express.Router();

cloudinary.config();

router.use("/uploads", express.static("src/uploads"));

router.get("/threads", ThreadsController.find);
router.get("/thread/:id", ThreadsController.findOne);
router.post("/thread", upload("image"), ThreadsController.create);
router.patch("/thread/:id", ThreadsController.update);
router.delete("/thread/:id", ThreadsController.delete);

router.post("/auth/register", AuthControllers.register);
router.post("/auth/login", AuthControllers.login);
router.get(
  "/auth/check",
  AuthenticationMiddleware.Authentication,
  AuthControllers.check,
);

export default router;
