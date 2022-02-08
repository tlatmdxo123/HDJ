import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { addPost } from '../store/Boards';
import { Post } from '../types/post';
import { uuidv4 } from '../utils/uuid';
import PostItem from './PostItem';

interface Props {
  boardId: string;
  posts: Post[];
}

const PostLists: React.FC<Props> = ({ boardId, posts }) => {
  const dispatch = useDispatch();
  const containerRef = useRef<HTMLUListElement>(null);

  const currentPosition = containerRef.current?.getBoundingClientRect();
  function handleDoubleClick(e: React.MouseEvent) {
    if (e.detail === 2 && currentPosition) {
      const newPost = {
        id: uuidv4(),
        title: '',
        content: '',
        position: { x: e.clientX - currentPosition.x, y: e.clientY - currentPosition.y },
      };

      dispatch(addPost(boardId, newPost));
    }
  }
  return (
    <Container onClick={(e) => handleDoubleClick(e)} ref={containerRef}>
      {posts.map((post) => (
        <PostItem
          key={post.id}
          boardId={boardId}
          boardPos={{ x: currentPosition?.x as number, y: currentPosition?.y as number }}
          {...post}
        />
      ))}
    </Container>
  );
};

const Container = styled.ul`
  position: relative;
  height: 100%;
  overflow: hidden;
`;

export default PostLists;
