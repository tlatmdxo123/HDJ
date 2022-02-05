import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { selectBoard } from '../selectors/boards';
import { selectCurrentTab } from '../selectors/tab';
import { editBoardName } from '../store/Boards';
import { Board } from '../types/board';
import PostLists from './PostLists';

const PostBoard: React.FC = () => {
  const currentTab = useSelector(selectCurrentTab);
  const board = useSelector(selectBoard(currentTab)) as Board;

  const [editTitle, setEditTitle] = useState(false);
  const [titleValue, setTitleValue] = useState('');

  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (board) setTitleValue(board.name);
  }, [board]);

  const dispatch = useDispatch();

  if (board === undefined) return <div />;

  function editComplete() {
    dispatch(editBoardName(board.id, titleValue));
    setEditTitle(false);
  }

  function onClickEditTitle(e: React.MouseEvent) {
    if (!titleRef.current?.contains(e.target as Node)) editComplete();
  }

  function editBoardTitle(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      editComplete();
    }
  }

  return (
    <Container onClick={onClickEditTitle}>
      <TitleContainer ref={titleRef}>
        {editTitle ? (
          <TitleInput
            value={titleValue}
            placeholder="보드 이름을 입력하세요"
            onChange={(e) => setTitleValue(e.target.value)}
            onKeyPress={editBoardTitle}
            autoFocus
          />
        ) : (
          <Title onClick={() => setEditTitle(true)}>{board.name}</Title>
        )}
      </TitleContainer>
      <PostLists boardId={board.id} posts={board.posts} />
    </Container>
  );
};
const Container = styled.div`
  flex-grow: 1;
`;
const TitleContainer = styled.div``;
const Title = styled.h2``;
const TitleInput = styled.input`
  font-size: 1.5em;
  margin: 0.83em 0;
`;
export default PostBoard;
