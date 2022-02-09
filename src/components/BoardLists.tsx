import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectBoards } from '../selectors/boards';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { setTab } from '../store/Tab';
import { addBoard, removeBoard } from '../store/Boards';
import { uuidv4 } from '../utils/uuid';
import { selectCurrentTab } from '../selectors/tab';

const BoardLists: React.FC = () => {
  const dispatch = useDispatch();
  const currentTab = useSelector(selectCurrentTab);
  const boards = useSelector(selectBoards);

  const inputRef = useRef<HTMLInputElement>(null);

  const [inputActive, setInputActive] = useState(false);
  const [newBoardName, setNewBoardName] = useState('');

  function activeTab(id: string) {
    dispatch(setTab(id));
  }

  function addNewBoard(boarName: string) {
    if (boarName.length === 0) {
      setInputActive(false);
      return;
    }

    const id = uuidv4();

    const newBoard = {
      id,
      name: boarName,
      posts: [],
    };

    dispatch(addBoard(newBoard));
    setNewBoardName('');
    setInputActive(false);
    activeTab(id);
  }

  function removeBoardOnClickButton(id: string) {
    if (window.confirm('정말 삭제하시겠습니까?')) dispatch(removeBoard(id));
  }

  function addButtonClickHandler() {
    if (inputActive) {
      addNewBoard(newBoardName);
    }
    setInputActive(true);
  }

  return (
    <Container>
      <Title>Board Lists</Title>
      <BoardNames role="tablist" aria-label="board tabs">
        {boards.map(({ id, name }) => (
          <BoardItem key={id} role="tab" aria-selected={id === currentTab} selected={id === currentTab} onClick={() => activeTab(id)}>
            <BoardName>{name}</BoardName>
            <RemoveButton type="button" onClick={() => removeBoardOnClickButton(id)}>
              x
            </RemoveButton>
          </BoardItem>
        ))}
      </BoardNames>
      {inputActive && (
        <NameInput
          type="text"
          ref={inputRef}
          value={newBoardName}
          autoFocus
          placeholder="보드 이름을 입력하세요"
          onChange={(e) => setNewBoardName(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addNewBoard(newBoardName)}
        />
      )}
      <AddButton type="button" onClick={addButtonClickHandler}>
        +
      </AddButton>
    </Container>
  );
};

const Container = styled.nav`
  width: 300px;
  height: 100vh;
  background: #ede0d4;
  padding: 30px 20px;
  box-sizing: border-box;
`;
const Title = styled.h3``;

const BoardNames = styled.div``;

const BoardName = styled.span``;
const BoardItem = styled.div<{ selected: boolean }>`
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  width: 100%;
  background: ${({ selected }) => (selected ? '#ddb892' : '')};
`;
const AddButton = styled.button`
  width: 100%;
  cursor: pointer;
`;
const RemoveButton = styled.button`
  color: red;
`;
const NameInput = styled.input`
  width: 100%;
  background-color: transparent;
`;
export default BoardLists;
