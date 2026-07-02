const getAdminSinglePost = async (token, postId) => {

  const response = await fetch(`https://blog-api-production-0057.up.railway.app/api/admin/posts/${postId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

    if (!response.ok) {
    const data = await response.json();
    const error = new Error(data.error || "Failed to fetch post")
    error.status = response.status
    throw error
  }

  const data = await response.json();  // parses json into javascript object
  return data;

}


export default getAdminSinglePost