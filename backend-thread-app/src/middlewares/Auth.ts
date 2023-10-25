import * as jwt from "jsonwebtoken"
import { NextFunction, Request, Response } from "express"

export default new class AuthenticationMiddleware {
  Authentication(req: Request, res: Response, next: NextFunction) : Response {
    try {
      const authorizationHeader = req.headers.authorization

      if(!authorizationHeader || !authorizationHeader.startsWith("Bearer")) {
        return res.status(401).json({ message: "unauthorized / token is not valid" })
      }

      const token = authorizationHeader.split(" ")[1]

      try {
        const loginSession = jwt.verify(token, "dumbwaysterbaik");
        res.locals.loginSession = loginSession;
        next();
      } catch (err) {
        return res.status(401).json({
          error: "unauthorized!"
        });
      }
    } catch (err) {
      return res.status(401).json({ message: "unauthorized" })
    }
  }
}