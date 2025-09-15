import Navbar from "../components/navbar";
import { Link } from "react-router";
import Footer from "../components/footer";
import { useQuery } from "@tanstack/react-query";
import getposts from "../api/posts";
import { useAuthContext } from "../context/useAuthContext";


export default function Homepage() {


  const { accessToken, role } = useAuthContext();


  const { data: posts, isLoading, isError, error } = useQuery( {
    queryKey: ["posts"],
    queryFn: () => getposts(accessToken),   // token from auth context global state
    enabled: !!accessToken
  });


  if (isLoading) {
    return <div>Loading posts...</div>;
  }

 


  if (isError) {
    return <div>{error.message}</div>;
  }

  if (role === null) {
  return <div>Loading posts...</div>
}

  
  

  return (
  <>
      <Navbar />
      <main>
      <div className="bg-white sm:py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-fit text-center">
            <h2 className="text-4xl font-semibold font-mono tracking-tight text-gray-900 sm:text-5xl">
              From the blog
            </h2>
            <p className="mt-2 text-lg font-mono text-gray-600">
              This is where I share what I’ve learned about life, growth, and everything in between.
            </p>
          </div>

          {posts?.length === 0 &&  (
            <p className=" text-xl text-center mt-6 text-red-500 font-mono">No posts are found!</p>
            )}


          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:max-w-none lg:grid-cols-3">
            {posts?.map((post) => (
              <Link to={`/pages/posts/${post.id}`}
              
                key={post.id}
                className="flex max-w-xl bg-gray-100 py-3 px-4 rounded-2xl flex-col items-start justify-center hover:bg-gray-200 hover:ease-in-out"
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

              </Link>
            ))}
          </div>
        </div>
      </div>
        
      </main>
      <Footer />
    </>
  );
}

