const deleteComment = async (token, postId, commentId) => {
  const response = await fetch(`http://localhost:3000/api/posts/${postId}/comments/${commentId}`, {
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
