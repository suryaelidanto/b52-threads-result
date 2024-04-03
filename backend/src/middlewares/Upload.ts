import { NextFunction, Request, Response } from "express";
import * as multer from "multer";
import * as path from "path";

export const upload = (fieldName: string) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./src/uploads");
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now();
      cb(
        null,
        file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname),
      );
    },
  });

  const uploadFile = multer({ storage });

  return (req: Request, res: Response, next: NextFunction) => {
    uploadFile.single(fieldName)(req, res, (err) => {
      console.log(err);
      if (err) {
        return res.status(400).json({
          error: "File upload failed. ",
        });
      }

      res.locals.filename = req.file.filename;
      next();
    });
  };
};
