import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { Position, Post } from '../types/post';
import PostItem from './PostItem';
import PostItemEdit from './PostItemEdit';

interface Props {
  boardId: string;
  posts: Post[];
}

const PostLists: React.FC<Props> = ({ boardId, posts }) => {
  const [edit, setEdit] = useState(false);
  const [pos, setPos] = useState<Position>({ x: 0, y: 0 });
  const containerRef = useRef<HTMLUListElement>(null);

  const currentPosition = containerRef.current?.getBoundingClientRect();
  function handleDoubleClick(e: React.MouseEvent) {
    if (e.detail === 2 && currentPosition && !edit) {
      setEdit(true);
      setPos({ x: e.clientX - currentPosition.x, y: e.clientY - currentPosition.y });
    }
  }
  return (
    <Container onClick={(e) => handleDoubleClick(e)} ref={containerRef}>
      {posts.map((post) => (
        <PostItem key={post.id} boardId={boardId} {...post} />
      ))}
      {edit && <PostItemEdit position={pos} onCancel={() => setEdit(false)} boardId={boardId} />}
    </Container>
  );
};

const Container = styled.ul`
  position: relative;
  height: 100%;
`;

export default PostLists;
