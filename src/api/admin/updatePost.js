const updatePost = async (token, postId, updatedPostTitle, updatedPostContent) => {
  const response = await fetch(`http://localhost:3000/api/admin/posts/${postId}`, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ updatedPostTitle, updatedPostContent })    // converts to JSON string
  })


  const data = await response.json(); // parses it into a JavaScript object 

  return {
    status: response.status,
    data    
  };

}




export default updatePost
