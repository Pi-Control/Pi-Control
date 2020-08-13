import bcrypt from 'bcrypt';

import User from '../../db/models/User';

type CreateUser = { username: string; password: string };
type UpdateUser = { id: number; username: string };
type DeleteUser = { id: number; hard: boolean };

export default {
  Mutation: {
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
