import * as express from 'express'
import ThreadsController from '../controllers/ThreadsControllers'
import AuthControllers from '../controllers/AuthControllers'
import AuthenticationMiddleware from "../middlewares/Auth"

const router = express.Router()

router.get("/threads", ThreadsController.find)
router.get("/thread/:id", ThreadsController.findOne)
router.post("/thread", ThreadsController.create)
router.patch("/thread/:id", ThreadsController.update)
router.delete("/thread/:id", ThreadsController.delete)

router.post("/auth/register", AuthControllers.register)
router.post("/auth/login", AuthControllers.login)
router.get("/auth/check", AuthenticationMiddleware.Authentication, AuthControllers.check)

export default router