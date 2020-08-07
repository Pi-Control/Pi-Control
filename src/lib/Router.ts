import User from '../db/models/User';

export type RouteContext = {
  user?: User;
};
