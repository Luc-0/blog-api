async function updatePost(token, post, isPublic, callback) {
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

export { updatePost };
