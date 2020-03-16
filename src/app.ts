import express, { Request, Response, NextFunction } from 'express';
import graphqlHTTP from 'express-graphql';
import { json } from 'body-parser';
import { graphql } from 'graphql';
import expressPlayground from 'graphql-playground-middleware-express';
import dbTestRoute from './routes/dbTest';

import Scheduler from './lib/scheduler/Scheduler';

import { schema, resolvers } from './graphql';

const app = express();

app.use(json());

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue: resolvers,
  })
);

Scheduler.call(() => {
  console.log('scheduler', new Date());
}).every('1m');

app.get('/playground', expressPlayground({ endpoint: '/graphql' }));

app.use('/db', dbTestRoute);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log('Something bad happend :(', err);
  next();
});

graphql(schema, '{ hello }', resolvers).then(response => {
  console.log(response);
});

app.listen(3000, () => console.log('Listening on http://localhost:3000'));
