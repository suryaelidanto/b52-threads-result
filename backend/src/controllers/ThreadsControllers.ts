import { Request, Response } from "express";
import ThreadsService from "../services/ThreadsServices";
import ThreadQueue from "../queues/ThreadQueue";

class ThreadController {
  find(req: Request, res: Response) {
    ThreadsService.find(req, res);
  }

  findOne(req: Request, res: Response) {
    ThreadsService.findOne(req, res);
  }

  create(req: Request, res: Response) {
    ThreadQueue.create(req, res);
  }

  update(req: Request, res: Response) {
    ThreadsService.update(req, res);
  }

  delete(req: Request, res: Response) {
    ThreadsService.delete(req, res);
  }
}

export default new ThreadController();
