const deletePost = async (token, postId) => {
  const response = await fetch(`http://localhost:3000/api/admin/posts/${postId}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  const data = await response.json();
  return {
    status: response.status,
    data
  };

}

export default deletePost