import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "../../context/useAuthContext";
import getAdminPosts from "../../api/admin/adminPosts";
import { Link } from "react-router";
import NavbarAdmin from "../../components/navbarAdmin";

const AdminHomePage = () => {

  
  const { accessToken, role } = useAuthContext();

  
  const { data: posts, isLoading, isError, error } = useQuery({
    queryKey: ['posts'],
    queryFn: () => getAdminPosts(accessToken),
    enabled: !!accessToken
  })


  console.log(accessToken)

  if (isLoading || !posts) {
    return <div>Loading Posts...</div>
  }


  if (isError) {
    return <div>{error}</div>
  }
 

  if (role === null) {
    return <div>Loading posts...</div>
  }

  

  return (
    <>
      <NavbarAdmin />
      <main>
      <div className="py-2">
        <div className="mx-auto max-w-7xl px-6 lg:px-5">
          <div className="mx-auto max-w-fit text-center">
            <p className="text-5xl mt-2 font-semibold font-mono tracking-tight text-gray-900">
              Dashboard
            </p>
            <p className="mt-4 text-xl font-mono text-gray-600">
              All Posts
            </p>
          </div>

          {posts?.length === 0 &&  (
            <p className=" text-xl text-center mt-6 text-red-500 font-mono">No posts are found!</p>
            )}


          <div className="mx-auto mt-10 flex flex-col justify-center max-w-2xl gap-x-8 gap-y-10 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16">
            {posts?.map((post) => (
              <Link to={`/pages/admin/posts/${post.id}`}
              
                key={post.id}
                className="flex max-w-xl shadow-sm bg-white-100 py-3 px-4 rounded-2xl flex-col items-start justify-center"
              >
                <div className="flex flex-col items-start gap-x-4 text-xs text-gray-500">
                  <time dateTime={post.createdAt}>
                    {new Date(post.createdAt).toLocaleDateString("en-gb", {
                      day: "numeric",
                      month: "long",
                      year: "numeric"
                    })}
                  </time>



                <div className="flex flex-col">
                  <h3 className="mt-3 line-clamp-1 text-lg font-semibold cursor-pointer text-gray-900 group-hover:text-gray-600">
                    {post.title}
                  </h3>
                  <p className="mt-5 line-clamp-1 text-sm text-gray-600">
                    {post.content}
                  </p>
                </div>

                <div className="relative mt-8 flex items-center gap-x-4">
                  <img src="https://plus.unsplash.com/premium_photo-1723708857381-82e3b34187b5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aGVhZHNob3R8ZW58MHwyfDB8fHww" alt="" className="size-10 rounded-full bg-gray-50" />
                  <div className="text-sm">
                    <p className="font-semibold text-gray-900">{post.author.username}</p>
                  <p className="text-gray-600">Co-Founder / Admin</p>
                  </div>
                </div>

                </div>

                <p className={`text-sm px-3 py-2 rounded-xl mt-3 ml-auto font-medium font-rubik
                    ${post.published ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}
                  `}
                >
                   {post.published ? 'Published' : 'Not Published'}
                </p>


              


              </Link>


            ))}
          </div>
        </div>
      </div>
        
      </main>
    </>
  );
};

export default AdminHomePage;

