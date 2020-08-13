import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { AuthenticationError, UserInputError } from 'apollo-server-express';

import { RouteContext } from '../../lib/Router';
import config from '../../config';
import User from '../../db/models/User';

type CreateAccessToken = { username: string; password: string };

export default {
  Mutation: {
    createAccessToken: (
      parent: void,
      payload: CreateAccessToken,
      context: RouteContext,
    ): Promise<string> =>
      new Promise(() => {
        if (context.user) {
          throw new UserInputError('Account already authenticated');
        }
      })
        .then(() => User.findOneOrFail({ name: payload.username }))
        .then((user) => {
          return bcrypt
            .compare(payload.password, user.password)
            .then((success) => ({ success, user }));
        })
        .then(({ success, user }) => {
          if (!success) {
            throw new AuthenticationError('Account is not valid');
          }

          return jwt.sign({}, config.getSalt(), {
            jwtid: user.id + '',
            expiresIn: '24h',
          });
        }),
  },
};
