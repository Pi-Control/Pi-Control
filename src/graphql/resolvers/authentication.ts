import jwt from 'jsonwebtoken';
import user from '../../db/user';
import { AuthenticationError, UserInputError } from 'apollo-server-express';
import { RouteContext } from '../../lib/Router';
import config from '../../config';

export default {
  Mutation: {
    createAccessToken: (
      parent: void,
      { username, password }: { username: string; password: string },
      context: RouteContext,
    ): Promise<string> => {
      return user.isValid(username, password).then((result) => {
        if (!result) {
          throw new AuthenticationError('Account is not valid');
        }

        if (context.user) {
          throw new UserInputError('Account already authenticated');
        }

        const token = jwt.sign({}, config.getSalt(), {
          jwtid: username,
          expiresIn: '24h',
        });

        user.logIn(username);

        return Promise.resolve(token);
      });
    },
  },
};
