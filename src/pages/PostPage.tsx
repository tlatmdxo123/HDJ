import React from 'react';
import BoardLists from '../components/BoardLists';
import PostBoard from '../components/PostsBoard';
import styled from 'styled-components';

const PostPage: React.FC = () => {
  return (
    <Container>
      <BoardLists />
      <PostBoard />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
`;

export default PostPage;
