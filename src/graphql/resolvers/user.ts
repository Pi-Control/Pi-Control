import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AuthenticationError, UserInputError } from 'apollo-server-express';

import { RouteContext } from '../../lib/Router';
import config from '../../config';
import User from '../../db/models/User';

type CreateAccessToken = { username: string; password: string };
type CreateUser = { username: string; password: string };
type UpdateUser = { id: number; username: string };
type DeleteUser = { id: number; hard: boolean };

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
    createUser: (parent: void, payload: CreateUser): Promise<User> =>
      bcrypt
        .hash(payload.password, 10)
        .then((hash) => {
          const user = new User();
          user.name = payload.username;
          user.password = hash;

          return user;
        })
        .then((user) => user.save()),

    updateUser: (parent: void, payload: UpdateUser): Promise<User> =>
      User.findOneOrFail(payload.id).then((user) => {
        user.name = payload.username;

        return user.save();
      }),

    deleteUser: (parent: void, payload: DeleteUser): Promise<User> =>
      User.findOneOrFail(payload.id).then((user) => {
        if (payload.hard) {
          return user.remove();
        }
        return user.softRemove();
      }),
  },
  Query: {
    getUsers: (): Promise<User[]> => User.find(),
  },
};
