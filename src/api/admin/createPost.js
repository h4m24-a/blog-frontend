const createPost = async (token, title, content) => {
  const response = await fetch("http://localhost:3000/api/admin/post", {
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