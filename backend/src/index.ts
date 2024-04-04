import * as express from "express";
import * as cors from "cors";
import { AppDataSource } from "./data-source";
import { Request, Response } from "express";
import router from "./route";
import workers from "./workers";
import EventEmitter = require("events");
import e = require("express");

AppDataSource.initialize()
  .then(async () => {
    const app = express();
    const port = 5000;

    app.use(cors());
    app.use(express.json());
    app.use("/api/v1", router);

    router.get("/", (req: Request, res: Response) => {
      res.send("Hello Worldsdafasdfasf");
    });

    const eventEmitter = new EventEmitter();

    router.get("/notifications", (req: Request, res: Response) => {
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Connection", "keep-alive");

      eventEmitter.on("message", (data) => {
        res.write(`data: ${JSON.stringify(data)}\n\n`);
      });
    });

    router.get("/new-thread", (req: Request, res: Response) => {
      const newThread = { message: "New thread!" };

      eventEmitter.emit("message", newThread);

      res.sendStatus(200);
    });

    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });

    workers;
  })
  .catch((error) => console.log(error));
