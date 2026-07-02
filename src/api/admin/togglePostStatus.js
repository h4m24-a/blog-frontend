const togglePostStatus = async (token, postId) => {
  const response = await fetch(`https://blog-api-production-0057.up.railway.app/api/admin/posts/${postId}/toggle`, {
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