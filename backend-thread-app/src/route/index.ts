import * as express from 'express'
import ThreadsController from '../controllers/ThreadsControllers'

const router = express.Router()

router.get("/threads", ThreadsController.find)
router.get("/thread/:id", ThreadsController.findOne)
router.post("/thread", ThreadsController.create)
router.patch("/thread/:id", ThreadsController.update)
router.delete("/thread/:id", ThreadsController.delete)

export default router