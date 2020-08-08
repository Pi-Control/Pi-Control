import express, { Request, Response, NextFunction } from 'express';
import { json } from 'body-parser';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import jwt from 'jsonwebtoken';

import * as Bootstrap from './bootstrap';
import { typeDefs, resolvers } from './graphql';
import user from './db/user';
import config from './config';

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

        const u = await user.getByName(jwt.jti);

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

Bootstrap.initializeMetrics();

Bootstrap.startCollecting();

// Debug things

user.create('Foo', 'Bar');

// End

app.listen(3000, () => console.log('Listening on http://localhost:3000'));
