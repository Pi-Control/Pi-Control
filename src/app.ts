import express, {Request, Response, NextFunction} from "express";
import graphqlHTTP from "express-graphql";
import { json } from "body-parser";
import { graphql, buildSchema } from  'graphql';
import si from 'systeminformation';

import testRoute from "./routes/test";

const schema = buildSchema(`
  scalar JSONObject

  type Query {
    hello: String,
    cpu: CPU
  }

  type CPU {
    manufacturer: String,
    brand: String,
    vendor: String,
    family: String,
    model: String,
    stepping: String,
    revision: String,
    voltage: String,
    speed: String,
    speedmin: String,
    speedmax: String,
    governor: String,
    cores: Int,
    physicalCores: Int,
    processors: Int,
    socket: String,
    cache: JSONObject

  }
`);

const root = { 
  hello: () => 'Hello world!',
  cpu: si.cpu(),
};

const app = express();

app.use(json());

app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true,
}));

app.use("/test", testRoute);


app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log("Something bad happend :(", err);
  next();
});

graphql(schema, '{ hello }', root).then((response) => {
  console.log(response);
});

app.listen(3000, () => console.log("Listening on http://localhost:3000"));
