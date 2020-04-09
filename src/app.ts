import express, { Request, Response, NextFunction } from 'express';
import { json } from 'body-parser';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';

import * as Bootstrap from './bootstrap';
import { typeDefs, resolvers } from './graphql';
import dbTestRoute from './routes/dbTest';

const app = express();

app.use(json());
app.use(cors());

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });

app.use('/db', dbTestRoute);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log('Something bad happend :(', err);
  next();
});

Bootstrap.initializeMetrics();

Bootstrap.startCollecting();

app.listen(3000, () => console.log('Listening on http://localhost:3000'));
