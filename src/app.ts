import express, { Request, Response, NextFunction } from 'express';
import { json } from 'body-parser';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import jwt from 'jsonwebtoken';

import * as Bootstrap from './bootstrap';
import { typeDefs, resolvers } from './graphql';
import config from './config';
import User from './db/models/User';
import { establishConnection } from './db/database';

const app = express();

app.use(json());
app.use(cors());

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const token = req.headers.authorization;

    if (!token) {
      return;
    }

    try {
      const decoded = jwt.verify(token, config.getSalt());

      if (typeof decoded === 'object') {
        // set it manually because typescript can't infer the correct type
        const jwt = decoded as { jti: string };

        const u = await User.findOne(jwt.jti);

        if (u) {
          return { user: u };
        }
      }
    } catch (err) {
      return;
    }
  },
});
server.applyMiddleware({ app });

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log('Something bad happend :(', err);
  next();
});

establishConnection().then(() => {
  Bootstrap.initializeMetrics();

  Bootstrap.startCollecting();
});

// End

app.listen(3000, () => console.log('Listening on http://localhost:3000'));
