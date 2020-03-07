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
    cpu: JSONObject
  }
`);

const root = { 
  hello: () => 'Hello world!',
  cpu: si.cpuCache,
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
