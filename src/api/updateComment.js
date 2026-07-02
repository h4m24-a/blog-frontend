const updateComment = async (token, postId, commentId, updatedContent) => {
  const response = await fetch(`https://blog-api-production-0057.up.railway.app/api/posts/${postId}/comments/${commentId}`, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ updatedContent })    // converts to JSON string
  })


  const data = await response.json(); // parses it into a JavaScript object 

  return {
    status: response.status,
    data    
  };

}




export default updateComment
