import React, { useState } from 'react';
import { Post } from '../types/post';
import { PostBody, PostContainer, PostHeader } from './PostItem';
import { editPost } from '../store/Boards';
import styled from 'styled-components';
import { LineButton, PrimaryButton } from './Buttons';
import { useDispatch } from 'react-redux';

interface Props {
  post: Post;
  onCancel: () => void;
  boardId: string;
}
const PostItemEdit: React.FC<Props> = ({ post, onCancel, boardId }) => {
  const { id, title, position, content } = post;
  const [titleInput, setTitle] = useState(title);
  const [contentInput, setContent] = useState(content);

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
      id,
      title: titleInput,
      content: contentInput,
      position,
    };

    dispatch(editPost(boardId, newPost));
    reset();
  }

  return (
    <PostContainer position={position}>
      <PostHeader>
        <TitleInput type="text" value={titleInput} onChange={(e) => setTitle(e.target.value)} placeholder="제목을 입력하세요" autoFocus />
      </PostHeader>
      <PostBody>
        <ContentInput
          id="post-content"
          name="post-content"
          value={contentInput}
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
