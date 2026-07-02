const deleteComment = async (token, postId, commentId) => {
  const response = await fetch(`https://blog-api-production-0057.up.railway.app/api/posts/${postId}/comments/${commentId}`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const data = await response.json();
    const error = new Error(data.error || "Failed to delete comment");
    error.status = response.status;
    throw error
  }

};

export default deleteComment;
