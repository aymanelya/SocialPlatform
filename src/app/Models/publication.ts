import { User } from './user';
import { Class } from './class';
import { Attachment } from './attachment';
import { Commentt } from './comment';

export class Publication {
  publicationId?: number;
  content: string;
  attachements?: Array<Attachment>;
  comments?: Array<Commentt>;
  datePublication?: Date;
  owner?: User;
  class?: Class;
  showComments?: boolean;
}
