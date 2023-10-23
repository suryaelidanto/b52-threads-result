import * as express from "express"
import { AppDataSource } from "./data-source"
import { Request, Response } from "express"
import router from "./route"

AppDataSource.initialize()
    .then(async () => {
        const app = express()
        const port = 5000
        

        app.use(express.json())
        app.use("/api/v1", router)

        router.get("/", (req: Request, res: Response) => {
            res.send("Hello Worldsdafasdfasf")
        })
        
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`)
        })
    })
    .catch(error => console.log(error))
