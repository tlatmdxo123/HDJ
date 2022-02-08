import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { MdHighlightOff, MdAddCircleOutline, MdRemoveCircleOutline } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { editPost, removePost } from '../store/Boards';
import { Position } from '../types/post';
import PostItemEdit from './PostItemEdit';

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
  const [edit, setEdit] = useState(false);
  const [open, setOpen] = useState(true);
  const [currentPos, setCurrPos] = useState(position);
  const [initialClickPos, setInitialClickPos] = useState<Position>();
  const [isDrag, setIsDrag] = useState(false);

  const headerRef = useRef<HTMLDivElement>(null);

  function onMouseDownHandler(e: React.MouseEvent) {
    setIsDrag(true);
    if (e.target === headerRef.current) setInitialClickPos({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
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
    if (title.length > 0 || content.length > 0) {
      if (!window.confirm('정말 삭제하시겠습니까?')) return;
    }
    dispatch(removePost(boardId, id));
  }
  return edit ? (
    <PostItemEdit post={{ id, title, content, position }} boardId={boardId} onCancel={() => setEdit(false)} />
  ) : (
    <PostContainer position={currentPos} isDrag={isDrag}>
      <PostHeader>
        <PostHeaderTitle
          ref={headerRef}
          onMouseDown={onMouseDownHandler}
          onMouseMove={onMouseMoveHandler}
          onMouseUp={onDragEnd}
          onMouseLeave={onDragEnd}
        >
          <Title onClick={() => setEdit(true)}>{title}</Title>
        </PostHeaderTitle>
        <Buttons>
          <Button type="button" onClick={() => setOpen((status) => !status)}>
            {open ? <MdRemoveCircleOutline /> : <MdAddCircleOutline />}
          </Button>
          <Button type="button" onClick={removePostItem}>
            <MdHighlightOff />
          </Button>
        </Buttons>
      </PostHeader>
      {open && <PostBody onClick={() => setEdit(true)}>{content}</PostBody>}
    </PostContainer>
  );
};

export const PostContainer = styled.li<{ position: Position; isDrag?: boolean }>`
  position: absolute;
  width: 250px;
  left: ${({ position }) => position.x + 'px'};
  top: ${({ position }) => position.y + 'px'};
  border-radius: 10px;
  border: 1px solid #d0bfff;
  overflow: hidden;
  box-shadow: ${({ isDrag }) => (isDrag ? '3px 3px 10px rgba(0,0,0,0.5)' : '')};
`;
export const PostHeader = styled.div`
  display: flex;
  background: #d0bfff;
  height: 30px;
  padding: 5px;
`;
const PostHeaderTitle = styled.div`
  flex-grow: 1;
  cursor: grab;
`;
const Title = styled.h5`
  margin: 0;
  width: max-content;
  min-width: 100px;
  height: 100%;
  cursor: text;
`;
const Buttons = styled.div`
  display: flex;
`;
const Button = styled.button`
  padding: 0;
  font-size: 20px;
  height: 100%;
`;

export const PostBody = styled.div`
  min-width: 250px;
  height: 200px;
  padding: 5px;
`;
export default PostItem;
