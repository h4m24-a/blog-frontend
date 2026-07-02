const updatePost = async (token, postId, updatedPostTitle, updatedPostContent) => {
  const response = await fetch(`https://blog-api-production-0057.up.railway.app/api/admin/posts/${postId}`, {
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
