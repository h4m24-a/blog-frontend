const getposts = async (token) => {
  const response = await fetch("https://blog-api-production-0057.up.railway.app/api/posts", {
    method: 'GET',
    credentials: "include",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  
  if (!response.ok) {
    const error = new Error("Failed to fetch posts");
    error.status = response.status;
    throw error;
  }
  
  const posts = await response.json();  // parses it into a JavaScript object 
  return posts;
};

export default getposts;
