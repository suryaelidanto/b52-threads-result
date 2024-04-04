import * as amqp from "amqplib";
import { v2 as cloudinary } from "cloudinary";
import { Repository } from "typeorm";
import { Thread } from "../entities/Threads";
import { AppDataSource } from "../data-source";
import { request } from "http";

class ThreadWorker {
  private readonly threadRepository: Repository<Thread> =
    AppDataSource.getRepository(Thread);

  async create() {
    try {
      const connection = await amqp.connect("amqp://localhost");

      const channel = await connection.createChannel();

      await channel.assertQueue("thread");

      await channel.consume("thread", async (message) => {
        const payload = JSON.parse(message.content.toString());

        const cloudinaryResponse = await cloudinary.uploader.upload(
          "./src/uploads/" + payload.image,
        );

        const thread = this.threadRepository.create({
          content: payload.content,
          image: cloudinaryResponse.secure_url,
          user: payload.user,
        });

        await this.threadRepository.save(thread);

        console.log("Thread is created! - ", payload);

        const req = request({
          hostname: "localhost",
          port: 5000,
          path: "/api/v1/new-thread",
          method: "GET",
        });

        req.on("error", (error) => {
          console.log("Thread worker error: ", error);
        });

        req.end();

        channel.ack(message);
      });
    } catch (error: unknown) {
      console.log(error);
    }
  }
}

export default new ThreadWorker();
