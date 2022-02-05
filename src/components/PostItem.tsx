import React, { useState } from 'react';
import styled from 'styled-components';
import { MdHighlightOff, MdAddCircleOutline, MdRemoveCircleOutline } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { editPost, removePost } from '../store/Boards';
import { Position } from '../types/post';

interface Props {
  id: string;
  title: string;
  content: string;
  position: Position;
  boardId: string;
  boardPos: Position;
}

const PostItem: React.FC<Props> = ({ id, title, content, position, boardId, boardPos }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);
  const [currentPos, setCurrPos] = useState(position);
  const [initialClickPos, setInitialClickPos] = useState<Position>();
  const [isDrag, setIsDrag] = useState(false);

  function onMouseDownHandler(e: React.MouseEvent) {
    setIsDrag(true);
    setInitialClickPos({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
  }
  function onMouseMoveHandler(e: React.MouseEvent) {
    if (isDrag && initialClickPos) {
      //page - 전체 페이지의 위치값
      //initialClickPos - post에서 클릭 위치값, 모서리를 기준으로 위치값이 정해지기 때문에 클릭시의 위치값 빼줌
      //boardPos - 보드안에서의 상대값을 계산하기 위한 보드의 위치값
      const nextX = e.pageX - initialClickPos.x - boardPos.x;
      const nextY = e.pageY - initialClickPos.y - boardPos.y;

      //보드를 벗어나지 않게 하기 위해 설정
      setCurrPos({ x: nextX < 0 ? 0 : nextX, y: nextY < 0 ? 0 : nextY });
    }
  }
  function onDragEnd() {
    setIsDrag(false);
    const editedPost = {
      id,
      title,
      content,
      position: currentPos,
    };
    dispatch(editPost(boardId, editedPost));
  }

  function removePostItem() {
    dispatch(removePost(boardId, id));
  }
  return (
    <PostContainer position={currentPos}>
      <PostHeader onMouseDown={onMouseDownHandler} onMouseMove={onMouseMoveHandler} onMouseUp={onDragEnd} onMouseLeave={onDragEnd}>
        <Title>{title}</Title>
        <Buttons>
          {open ? (
            <MdRemoveCircleOutline type="button" onClick={() => setOpen(false)} />
          ) : (
            <MdAddCircleOutline type="button" onClick={() => setOpen(true)} />
          )}
          <MdHighlightOff onClick={removePostItem} />
        </Buttons>
      </PostHeader>
      {open && <PostBody>{content}</PostBody>}
    </PostContainer>
  );
};

export const PostContainer = styled.li<{ position: Position }>`
  width: 250px;
  position: absolute;
  left: ${({ position }) => position.x + 'px'};
  top: ${({ position }) => position.y + 'px'};
  border-radius: 10px;
  border: 1px solid #d0bfff;
  overflow: hidden;
`;
export const PostHeader = styled.div`
  height: 30px;
  display: flex;
  justify-content: space-between;
  background: #d0bfff;
  padding: 5px;
`;
const Title = styled.h5`
  margin: 0;
`;
const Buttons = styled.button`
  display: flex;
`;

export const PostBody = styled.div`
  height: 200px;
  padding: 5px;
`;
export default PostItem;
