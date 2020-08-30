import { RouteContext, userHasRightsOrFail } from '../../lib/Router';
import Right from '../../db/models/Right';
import Group from '../../db/models/Group';

type createGroup = { name: string; isAdmin: boolean; rights: number[] };
type updateGroup = {
  id: number;
  name: string;
  isAdmin: boolean;
  rights: number[];
};
type deleteGroup = { id: number; hard: boolean };

async function getGroups(
  parent: void,
  payload: unknown,
  context: RouteContext,
): Promise<Group[]> {
  userHasRightsOrFail(context, ['groups.get']);
  return Group.find();
}

async function createGroup(
  parent: void,
  payload: createGroup,
  context: RouteContext,
): Promise<Group> {
  userHasRightsOrFail(context, ['groups.create']);

  const rights = await Promise.all(
    payload.rights.map((right) => Right.findOneOrFail(right)),
  );

  const group = new Group();
  group.name = payload.name;
  group.isAdmin = payload.isAdmin;
  group.rights = rights;

  return group.save();
}

async function updateGroup(
  parent: void,
  payload: updateGroup,
  context: RouteContext,
): Promise<Group> {
  userHasRightsOrFail(context, ['groups.update']);

  const group = await Group.findOneOrFail(payload.id);

  const rights = await Promise.all(
    payload.rights.map((right) => Right.findOneOrFail(right)),
  );

  group.name = payload.name;
  group.isAdmin = payload.isAdmin;
  group.rights = rights;

  return group.save();
}

async function deleteGroup(
  parent: void,
  payload: deleteGroup,
  context: RouteContext,
): Promise<Group> {
  userHasRightsOrFail(context, ['groups.delete']);

  const group = await Group.findOneOrFail(payload.id);

  if (payload.hard) {
    return group.remove();
  }
  return group.softRemove();
}

export default {
  Mutation: {
    createGroup,
    updateGroup,
    deleteGroup,
  },
  Query: {
    getGroups,
  },
};
