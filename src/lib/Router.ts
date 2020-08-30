import { AuthenticationError } from 'apollo-server-express';

import User from '../db/models/User';
import { AutorisationError } from '../graphql/errors';

export type RouteContext = {
  user?: User;
};

export function userHasRightsOrFail(
  context: RouteContext,
  rights: string[],
): void {
  if (!context.user) {
    throw new AuthenticationError('Account is not valid');
  }
  const user = context.user;

  if (!rights.every((right) => user.hasRight(right))) {
    throw new AutorisationError('Account is not autorised');
  }
}
