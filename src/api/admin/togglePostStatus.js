const togglePostStatus = async (token, postId) => {
  const response = await fetch(`http://localhost:3000/api/admin/posts/${postId}/toggle`, {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      Authorization: `Bearer ${token}`
    },
  })

  const data = await response.json(); // parses it into a JavaScript object 
  return data


}



export default togglePostStatus