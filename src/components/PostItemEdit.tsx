import React, { useState } from 'react';
import { Position } from '../types/post';
import { PostBody, PostContainer, PostHeader } from './PostItem';
import { addPost } from '../store/Boards';
import styled from 'styled-components';
import { LineButton, PrimaryButton } from './Buttons';
import { uuidv4 } from '../utils/uuid';
import { useDispatch } from 'react-redux';

interface Props {
  position: Position;
  onCancel: () => void;
  boardId: string;
}
const PostItemEdit: React.FC<Props> = ({ position, onCancel, boardId }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const dispatch = useDispatch();

  function reset() {
    setTitle('');
    setContent('');
    onCancel();
  }

  function EnterHandler(e: React.KeyboardEvent) {
    if (e.key === 'Enter') makeNewPost();
  }

  function makeNewPost() {
    const newPost = {
      id: uuidv4(),
      title,
      content,
      position,
    };

    dispatch(addPost(boardId, newPost));
    reset();
  }

  return (
    <PostContainer position={position}>
      <PostHeader>
        <TitleInput type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="제목을 입력하세요" autoFocus />
      </PostHeader>
      <PostBody>
        <ContentInput
          id="post-content"
          name="post-content"
          value={content}
          placeholder="내용을 입력하세요"
          onChange={(e) => setContent(e.target.value)}
          onKeyPress={EnterHandler}
        />
      </PostBody>
      <Buttons>
        <LineButton type="button" color="#f03e3e" onClick={onCancel}>
          취소하기
        </LineButton>
        <PrimaryButton type="submit" backgroundColor="#845ef7" color="#ffffff" onClick={makeNewPost} style={{ marginLeft: '5px' }}>
          추가하기
        </PrimaryButton>
      </Buttons>
    </PostContainer>
  );
};

const TitleInput = styled.input`
  width: 100%;
  background: none;
`;
const ContentInput = styled.textarea`
  width: 100%;
  height: 100%;
`;
const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 5px 10px;
`;

export default PostItemEdit;
