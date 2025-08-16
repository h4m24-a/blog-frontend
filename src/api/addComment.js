const addComment = async (token, postId, content) => {
  const response = await fetch(`http://localhost:3000/api/posts/${postId}/comments`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      "Content-Type": "application/json" ,
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ content })
  })
  
  if (!response.ok) {
    const data = await response.json();
    const error = new Error(data.error || "Failed to create comment")
    error.status = response.status
    throw error
  }
  const data = await response.json()    // parses it into a JavaScript object 
  return data;
}



export default addComment