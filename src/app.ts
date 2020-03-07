import express, {Request, Response, NextFunction} from "express";
import { json } from "body-parser";

import testRoute from "./routes/test";

const app = express();

app.use(json());

app.use("/test", testRoute);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log("Something bad happend :(", err);
  next();
});

app.listen(3000, () => console.log("Listening on http://localhost:3000"));
