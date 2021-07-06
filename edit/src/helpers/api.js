function createPost(token, postInput, callback) {
  const xhr = new XMLHttpRequest();
  xhr.onload = function () {
    if (!this.responseText) {
      callback(false);
      return;
    }

    const res = JSON.parse(this.responseText);
    if (res && res.code === 200) {
      callback(res.post);
      return;
    }

    callback(false);
  };
  const url = `${process.env.REACT_APP_API_URL}/posts/`;
  xhr.open('POST', url, true);
  xhr.setRequestHeader('Authorization', `Bearer ${token}`);
  xhr.setRequestHeader('Content-type', 'application/json');
  xhr.send(JSON.stringify(postInput));
}

function updatePost(token, post, isPublic, callback) {
  const xhr = new XMLHttpRequest();
  xhr.onload = function () {
    const res = JSON.parse(this.responseText);
    if (res && res.code === 200) {
      return callback(res.post);
    }
    return callback(false);
  };
  const url = `${process.env.REACT_APP_API_URL}/posts/${post._id}`;
  xhr.open('PUT', url, true);
  xhr.setRequestHeader('Authorization', `Bearer ${token}`);
  xhr.setRequestHeader('Content-type', 'application/json');
  xhr.send(
    JSON.stringify({
      title: post.title,
      text: post.text,
      status: isPublic,
    })
  );
}

function updateComment(token, postId, comment, callback) {
  const xhr = new XMLHttpRequest();
  xhr.onload = function () {
    if (!this.responseText) {
      callback(false);
      return;
    }

    const res = JSON.parse(this.responseText);
    if (res && res.code === 200) {
      callback(res.comment);
      return;
    }

    callback(res);
  };

  const url = `${process.env.REACT_APP_API_URL}/posts/${postId}/comments/${comment._id}`;
  xhr.open('PUT', url, true);
  xhr.setRequestHeader('Authorization', `Bearer ${token}`);
  xhr.setRequestHeader('Content-type', 'application/json');
  xhr.send(JSON.stringify(comment));
}

export { createPost, updatePost, updateComment };
