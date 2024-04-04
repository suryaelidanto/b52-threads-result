import { Request, Response } from "express";
import rabbitmq from "../libs/rabbitmq";
import { createThreadSchema } from "../utils/validators/Thread";

export default new (class ThreadQueue {
  async create(req: Request, res: Response) {
    try {
      const image = res.locals.filename;

      const data = {
        ...req.body,
        image,
      };

      const { error } = createThreadSchema.validate(data);

      if (error) {
        return res.status(400).json({
          error: error,
        });
      }

      rabbitmq.sendToQueue("thread", JSON.stringify(data));

      res.status(200).json({
        messsage: "Thread enqueued!",
      });
    } catch (error: unknown) {
      res.status(500).json({
        error: "Something wrong in the server!",
      });
    }
  }
})();
