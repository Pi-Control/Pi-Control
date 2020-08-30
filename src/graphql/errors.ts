import { ApolloError } from 'apollo-server-express';

export class AutorisationError extends ApolloError {
  constructor(message: string) {
    super(message, 'UNAUTORISED');

    Object.defineProperty(this, 'name', { value: 'AutorisationError' });
  }
}
