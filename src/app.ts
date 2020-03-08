import express, { Request, Response, NextFunction } from 'express';
import graphqlHTTP from 'express-graphql';
import { json } from 'body-parser';
import { graphql, buildSchema } from 'graphql';
import si from 'systeminformation';
import expressPlayground from 'graphql-playground-middleware-express';
import dbTestRoute from './routes/dbTest';

const schema = buildSchema(`
  scalar JSONObject

  type Query {
    hello: String
    cpu: CPU
    memory: Memory
  }

  type CPU {
    manufacturer: String
    brand: String
    vendor: String
    family: String
    model: String
    stepping: String
    revision: String
    voltage: String
    speed: String
    speedmin: String
    speedmax: String
    governor: String
    cores: Int
    physicalCores: Int
    processors: Int
    socket: String
    cache: JSONObject
  }

  type Memory {
    total: Float
    free: Float
    used: Float
    active: Float
    available: Float
    buffcache: Float
    buffers: Float
    cached: Float
    slab: Float
    swaptotal: Float
    swapused: Float
    swapfree: Float
  }
`);

const root = {
  hello: (): string => 'Hello world!',
  cpu: si.cpu(),
  memory: si.mem(),
};

const app = express();

app.use(json());

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue: root,
  })
);

app.get('/playground', expressPlayground({ endpoint: '/graphql' }));

app.use('/db', dbTestRoute);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log('Something bad happend :(', err);
  next();
});

graphql(schema, '{ hello }', root).then(response => {
  console.log(response);
});

app.listen(3000, () => console.log('Listening on http://localhost:3000'));
