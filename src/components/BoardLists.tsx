import React from 'react';
import { useSelector } from 'react-redux';
import { selectBoards } from '../selectors/boards';
import styled from 'styled-components';

const BoardLists: React.FC = () => {
  const boards = useSelector(selectBoards);

  return (
    <Container>
      {boards.map(({ id, name }) => (
        <p key={id}>{name}</p>
      ))}
    </Container>
  );
};

const Container = styled.div`
  width: 300px;
  height: 100vh;
  background: #ede0d4;
  padding: 30px 20px;
  box-sizing: border-box;
`;

export default BoardLists;
