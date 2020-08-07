import bcrypt from 'bcrypt';
import User from './models/User';

export default {
  create: async (name: string, password: string): Promise<User> => {
    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      password: hash,
      lastLoggedIn: null,
    });

    return user;
  },

  isValid: async (name: string, password: string): Promise<boolean> => {
    const user = await User.findOne({
      where: {
        name: name,
      },
    });

    if (user) {
      return await bcrypt.compare(password, user.password);
    }

    return false;
  },

  logIn: (name: string): void => {
    User.findOne({
      where: {
        name: name,
      },
    }).then((user) => {
      if (user) {
        user.lastLoggedIn = new Date();
        user.save();
      }
    });
  },

  getByName: (name: string): Promise<User | null> => {
    return User.findOne({
      where: {
        name: name,
      },
    });
  },

  getAll: (): Promise<User[]> => {
    return User.findAll();
  },
};
