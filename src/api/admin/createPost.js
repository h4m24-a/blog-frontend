const createPost = async (token, title, content) => {
  const response = await fetch("https://blog-api-production-0057.up.railway.app/api/admin/post", {
    method: 'POST',
    credentials: 'include',
     headers: {
      "Content-Type": "application/json" ,
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title, content })
  })

  const data = await response.json() // parse json into javascript object;
  return {
    status: response.status,
    data    
  };
}


export default createPost;