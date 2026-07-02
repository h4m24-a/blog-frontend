const adminDeleteComment =  async (token, postId, commentId) => {
  const response = await fetch(`https://blog-api-production-0057.up.railway.app/api/admin/posts/${postId}/comments/${commentId}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: { Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const data = await response.json() // parses json into javascript object
    const error = new Error(data.error || "Failed to delete comment");
    error.status = response.status;
    throw error
  }
}


export default adminDeleteComment