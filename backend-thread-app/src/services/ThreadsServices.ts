// import { Repository } from "typeorm";
// import { Thread } from "../entities/Threads";
// import { AppDataSource } from "../data-source";
// import { Request, Response } from "express";
// import { createThreadSchema, updateThreadSchema } from "../utils/validators/Thread";

// class ThreadServices {
//   private readonly ThreadRepository:Repository<Thread> =
//     AppDataSource.getRepository(Thread)

//   async find(req: Request, res: Response): Promise<Response> {
//     try {
//       const Thread = await this.ThreadRepository.find()
//       return res.status(200).json(Thread)
//     } catch (err) {
//       return res.status(500).json({ Error: "Error while getting Thread" })
//     }
//   }

//   async findOne(req: Request, res: Response): Promise<Response> {
//     try {
//       const id = parseInt(req.params.id, 10)
//       const thread = await this.ThreadRepository.findOne({where: {
//         id: id
//       }})
//       return res.status(200).json(thread)
//     } catch (err) {
//       return res.status(500).json({ Error: "Error while getting thread by Id" })
//     }
//   }

//   async create(req: Request, res: Response): Promise<Response> {
//     try {
//       const data = req.body

//       const { error } = createThreadSchema.validate(data)
      
//       if (error) return res.status(400).json({error: error})

//       const thread = this.ThreadRepository.create({
//         content: data.content,
//         image: data.image
//       })

//       const createThread = this.ThreadRepository.save(thread)

//       return res.status(200).json(createThread)
//     } catch (err) {
//       return res.status(500).json({ Error: "Error while inserting thread" })
//     }
//   }

//   async update(req: Request, res: Response): Promise<Response> {
//     try {
//       const id = parseInt(req.params.id)

//       const thread = await this.ThreadRepository.findOne({where: {
//         id: id
//       }})

//       if(!thread) {
//         return res.status(400).json("Thread ID not found")
//       }

//       const data = req.body
//       const { error } = updateThreadSchema.validate(data)

//       if (error) return res.status(400).json({error: error})
//       if (data.content != "") thread.content = data.content
//       if (data.image != "") thread.image = data.image

//       const updatedThread = this.ThreadRepository.save(thread)
      
//       return res.status(200).json(updatedThread)
//     } catch (err) {
//       return res.status(500).json({ Error: "Error while updating thread" })
//     }
//   }

//   async delete(req: Request, res: Response): Promise<Response> {
//     try{
//       const id = parseInt(req.params.id)

//       const thread = await this.ThreadRepository.findOne({where: {
//         id: id
//       }})

//       if(!thread) return res.status(400).json("Data by id not found")
      
//       const deleteData = this.ThreadRepository.delete(id)

//       return res.status(200).json(deleteData)
//     } catch (err) {
//       return res.status(500).json({ Error: "Error while deleting thread" })
//     }
//   }
// }

// export default new ThreadServices



import { Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Thread } from "../entities/Threads";
import { createThreadSchema, updateThreadSchema } from "../utils/validators/Thread";

class ThreadsService {
  private readonly threadRepository: Repository<Thread> =
    AppDataSource.getRepository(Thread);

  async find(req: Request, res: Response) {
    try {
      const threads = await this.threadRepository.find({
        relations: ["user"]
      });

      let responseBaru = []

      threads.forEach(element => {
        responseBaru.push({
          ...element,
          likes_count: Math.floor(Math.random() * 100),
          replies_cout: Math.floor(Math.random() * 100)
        })
      });

      return res.status(200).json(responseBaru);
    } catch (err) {
      return res.status(500).json("Something wrong in server!")
    }
  }

  async findOne(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const thread = await this.threadRepository.findOne({
        where: {
          id: id,
        },
        relations: ["user"]
      });

      return res.status(200).json(thread);
    } catch (err) {
      return res.status(500).json("Something wrong in server!")
    }
  }

  async create(req: Request, res: Response) {
    try {
      const data = req.body;

      const { error } = createThreadSchema.validate(data)

      if (error) {
        return res.status(400).json({
          error: error
        })
      }

      // create object biar typenya sesuai
      const thread = this.threadRepository.create({
        content: data.content,
        image: data.image,
        user: data.user
      });

      // insertion ke database
      const createdThread = this.threadRepository.save(thread);

      return res.status(200).json(thread);
    } catch (err) {
      return res.status(500).json("Something wrong in server!")
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
      const { error } = updateThreadSchema.validate(data)

      if (error) {
        return res.status(400).json({
          error: error
        })
      }

      // bikin pengecekan hanya delete threadnya ketika thread dengan id yg sesuai param itu ada
      if (!thread) {
        return res.status(404).json("Thread ID not found!")
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
      return res.status(500).json("Something wrong in server!")
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
        return res.status(404).json("Thread ID not found!")
      }

      const deletedThread = this.threadRepository.delete({
        id: id,
      });

      return res.status(200).json(thread);
    } catch (err) {
      return res.status(500).json("Something wrong in server!")
    }
  }
}

export default new ThreadsService();
