import { Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Thread } from "../entities/Threads";
import {
  createThreadSchema,
  updateThreadSchema,
} from "../utils/validators/Thread";
import { v2 as cloudinary } from "cloudinary";

class ThreadsService {
  private readonly threadRepository: Repository<Thread> =
    AppDataSource.getRepository(Thread);

  async find(req: Request, res: Response) {
    try {
      const threads = await this.threadRepository.find({
        relations: ["user"],
        order: {
          id: "DESC",
        },
      });

      let responseBaru = [];

      threads.forEach((element) => {
        responseBaru.push({
          ...element,
          likes_count: Math.floor(Math.random() * 100),
          replies_cout: Math.floor(Math.random() * 100),
        });
      });

      return res.status(200).json(responseBaru);
    } catch (err) {
      return res.status(500).json("Something wrong in server!");
    }
  }

  async findOne(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const thread = await this.threadRepository.findOne({
        where: {
          id: id,
        },
        relations: ["user"],
      });

      return res.status(200).json(thread);
    } catch (err) {
      return res.status(500).json("Something wrong in server!");
    }
  }

  async create(req: Request, res: Response) {
    try {
      const image = res.locals.filename;

      const data = {
        ...req.body,
        image,
      };

      const cloudinaryResponse = await cloudinary.uploader.upload(
        "./src/uploads/" + image,
      );

      const { error } = createThreadSchema.validate(data);

      if (error) {
        return res.status(400).json({
          error: error,
        });
      }

      // create object biar typenya sesuai
      const thread = this.threadRepository.create({
        content: data.content,
        image: cloudinaryResponse.secure_url,
        user: data.user,
      });

      // insertion ke database
      const createdThread = this.threadRepository.save(thread);

      return res.status(200).json(thread);
    } catch (err) {
      return res.status(500).json("Something wrong in server!");
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const thread = await this.threadRepository.findOne({
        where: {
          id: id,
        },
      });

      const data = req.body;
      const { error } = updateThreadSchema.validate(data);

      if (error) {
        return res.status(400).json({
          error: error,
        });
      }

      // bikin pengecekan hanya delete threadnya ketika thread dengan id yg sesuai param itu ada
      if (!thread) {
        return res.status(404).json("Thread ID not found!");
      }

      if (data.content != "") {
        thread.content = data.content;
      }

      if (data.image != "") {
        thread.image = data.image;
      }

      const createdThread = await this.threadRepository.save(thread);
      return res.status(200).json(thread);
    } catch (err) {
      return res.status(500).json("Something wrong in server!");
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const thread = await this.threadRepository.findOne({
        where: {
          id: id,
        },
      });

      // bikin pengecekan hanya delete threadnya ketika thread dengan id yg sesuai param itu ada
      if (!thread) {
        return res.status(404).json("Thread ID not found!");
      }

      const deletedThread = this.threadRepository.delete({
        id: id,
      });

      return res.status(200).json(thread);
    } catch (err) {
      return res.status(500).json("Something wrong in server!");
    }
  }
}

export default new ThreadsService();
