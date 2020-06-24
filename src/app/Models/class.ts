import { User } from './user';

export interface Class {
  ClassId: number;
  Name: string;
  Branch: string;
  Grade: string;
  InvitationCode: string;
  Owner: User;
}
