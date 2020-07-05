import { User } from './user';

export interface Class {
  classId?: number;
  name: string;
  branch: string;
  grade: string;
  invitationCode?: string;
  owner?: User;
  members?: Array<User>;
  pending?: Array<User>;
}
