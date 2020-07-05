import { User } from './user';
import { Publication } from './publication';

export class Commentt {
  commentId?: number;
  PublicationId?: number;
  owner?: User;
  content: string;
  dateComment?: Date;
}
