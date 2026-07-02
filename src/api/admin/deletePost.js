const deletePost = async (token, postId) => {
  const response = await fetch(`https://blog-api-production-0057.up.railway.app/api/admin/posts/${postId}`, {
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