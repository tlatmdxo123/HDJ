import React, { useState } from 'react';
import styled from 'styled-components';
import { MdHighlightOff, MdAddCircleOutline, MdRemoveCircleOutline } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { removePost } from '../store/Boards';
import { Position } from '../types/post';

interface Props {
  id: string;
  title: string;
  content: string;
  position: Position;
  boardId: string;
}

const PostItem: React.FC<Props> = ({ id, title, content, position, boardId }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);

  function removePostItem() {
    dispatch(removePost(boardId, id));
  }
  return (
    <PostContainer position={position}>
      <PostHeader>
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
