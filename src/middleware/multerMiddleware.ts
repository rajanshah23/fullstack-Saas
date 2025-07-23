import { Request } from "express";
import multer from "multer";

const storage = multer.diskStorage({
  //Yo ho location   incoming file  lai kaha rakhney
  ///cb--->callback function--------------cb(error,success)
  destination: function (req: Request, file: Express.Multer.File, cb: any) {
    cb(null, "./src/storage");
  },
  //jun location ma file save vaxaa tesko name k rakhney
  filename: function (req: Request, file: Express.Multer.File, cb: any) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

export { multer, storage };
