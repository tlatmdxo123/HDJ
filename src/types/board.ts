import { Post } from './post';

export interface Board {
  id: string;
  name: string;
  posts: Post[];
}
