export interface Post {
  id: string;
  title: string;
  content: string;
  position: Position;
}

export interface Position {
  x: number;
  y: number;
}
