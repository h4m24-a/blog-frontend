const getAdminPosts = async (token) => {
  const response = await fetch("https://blog-api-production-0057.up.railway.app/api/admin/posts", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  

  const data = await response.json();    // parses it into a JavaScript object 
  return data;

}





export default getAdminPosts