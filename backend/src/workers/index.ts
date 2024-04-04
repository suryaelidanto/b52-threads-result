import { AppDataSource } from "../data-source";
import cloudinary from "../libs/cloudinary";
import ThreadWorker from "./ThreadWorker";

export default new (class Worker {
  constructor() {
    AppDataSource.initialize()
      .then(async () => {
        cloudinary.config();

        await Promise.all([ThreadWorker.create()]);
      })
      .catch((error) => console.log(error));
  }
})();
