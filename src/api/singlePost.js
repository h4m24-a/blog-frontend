const getSinglePost = async (token, postId) => {
  const response = await fetch(`http://localhost:3000/api/posts/${postId}`, {
    credentials: 'include',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  
  if (!response.ok) {
    const data = await response.json();
    const error = new Error(data.error || "Failed to fetch post")
    error.status = response.status
    throw error
  }
  
  const post = await response.json();   // parses it into a JavaScript object 
  return post

}




export default getSinglePost