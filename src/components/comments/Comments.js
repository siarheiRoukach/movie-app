import React from "react";
import { useSelector, shallowEqual } from "react-redux";

import CommentsInput from "../../common/commentsInput/CommentsInput";
import CommentsAuth from "../../common/commentsAuth/CommentsAuth";
import CommentsDisplay from "../../common/commentsDisplay/CommentsDisplay";

const Comments = ({ commentsStack }) => {
  const isAuthenticated = useSelector(
    state => state.auth.isAuthenticated,
    shallowEqual
  );

  const listComments =
    commentsStack &&
    commentsStack.map((comment, index) => (
      <CommentsDisplay key={index} comment={comment} />
    ));

  return (
    <>
      {isAuthenticated ? <CommentsInput /> : <CommentsAuth />}
      {listComments}
    </>
  );
};

export default Comments;
