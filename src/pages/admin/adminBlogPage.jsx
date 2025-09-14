import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuthContext } from "../../context/useAuthContext";
import { useParams } from "react-router";
import getAdminSinglePost from "../../api/admin/adminSinglePost";
import NavbarAdmin from "../../components/navbarAdmin";
import { useState, useEffect } from "react";
import adminDeleteComment from "../../api/admin/adminDeleteComment";
import adminUpdateComment from "../../api/admin/adminUpdateComment";

const AdminBlogPage = () => {

  const [updatedContent, setUpdatedContent] = useState("");
  const [updateCommentError, setUpdateCommentError] = useState("");
  const [updateSuccess, setUpdateSuccess] = useState("");
  
  const [selectCommentId, setSelectCommentId] = useState()
  const [showForm, setShowForm] = useState(false)


  const { postId } = useParams();

  const { accessToken } = useAuthContext()

  const queryClient = useQueryClient()

  const { data: post, isLoading, isError, error } = useQuery( {
    queryKey: ["post"],
    queryFn: () => getAdminSinglePost(accessToken, postId),   // token from auth context global state, postId from url param
    enabled: !!accessToken                              // Ensures the query only runs if accessToken exists
  });


    useEffect(() => {
    // clear updatedComment input when selected id changes
    setUpdatedContent("")
    setUpdateCommentError("")
    setUpdateSuccess("")
  }, [selectCommentId])  // This hook runs whenever selectCommentId changes
  


  if (isLoading || !post) {
    return <div>Loading Post...</div>
  }


  if (isError) {
    return <div>{error.message}</div>
  }
  




  // Function to handle deleting a comment
  const HandleDeleteComment = async (commentId) => {
    const alertYes = window.confirm('Do you want to delete this comment');

    if (alertYes) {
      try {
        await adminDeleteComment(accessToken, postId, commentId);

        queryClient.invalidateQueries(["post"])

      } catch (error) {
        throw new Error(error);
      }
    }
  }


  // Function to handle updating a comment
  const HandleUpdateComment = async (e, commentId) => {
    e.preventDefault()

    try {
     const response = await adminUpdateComment(accessToken, postId, commentId, updatedContent)


      // 404 not found error
      if (response.status === 404) {
        setUpdatedContent("");
        setUpdateCommentError(response.data.message);
        setUpdateSuccess("");
        setUpdateCommentError("");
      }


      // 200 if successfull
      if (response.status === 200) {
        setUpdatedContent(response.data.updatedComment.content);
        setUpdateSuccess(response.data.message)  // message is displayed, not visible because showForm is set to false when comment is updated
        setUpdateCommentError("")
        setUpdatedContent("")
        setShowForm(false)    

        // Invalidate the post query to refetch and displayed post data and comments
        queryClient.invalidateQueries(["post"]);

      }


      
      } catch (error) {
      setUpdateCommentError(error.message)
      setUpdatedContent("");
      setUpdateSuccess("")
      throw new Error(error)
    }
  }


  const HandleSelectCommentId = async (commentId) => {
    setShowForm(!showForm)    // flips value when clicked to hide and display form. initally set to false to hide the form.
    setSelectCommentId(commentId);
    setUpdateCommentError("");
    setUpdatedContent("")
    setUpdateSuccess("");
  }


  return (
    <> 
    <NavbarAdmin />
    <main>
      <div className="container mx-auto max-w-3xl p-6 lg:max-w-4xl">
          <article key={post.id} className="">
            <header className=" px-2 mb-4 flex flex-col">
              <h1 id="blog-title" className="text-center font-bold text-4xl">
                {post.title}
              </h1>

              <div className="flex flex-row items-center gap-x-3 mt-4 ">
                <img
                  src="https://plus.unsplash.com/premium_photo-1723708857381-82e3b34187b5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aGVhZHNob3R8ZW58MHwyfDB8fHww"
                  alt=""
                  className="size-13 rounded-full bg-gray-50 lg:size-16"
                />
                <div className="relative  outline-blue-700 mt-3 flex flex-col items-start gap-x-6  ">
                  <div className="text-sm">
                    <p className="font-semibold text-gray-900">
                      {post.author.username}
                    </p>
                    <p className="text-gray-600 mb-1 ">Co-Founder / Admin</p>
                  </div>

                  <time className="text-sm  font-medium">
                    {new Date(post.createdAt).toLocaleDateString("en-gb", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </time>
                </div>
              </div>
            </header>

            <div className="blog-post">
              <p id="blog-content" className="text-lg/8">
                {post.content}
              </p>
            </div>
          </article>

          
          <div className="comments-section">
            <p id="comment-title" className="mt-10 mb-5 text-4xl ">
              Comments
            </p>


            {post?.comments.map((comment) => {
              return (
                <div className="border-l-1  border-l-neutral-200 flex flex-row my-14 gap-x-3" key={comment.id}>
                  <img
                    src="https://static.vecteezy.com/system/resources/previews/002/387/693/non_2x/user-profile-icon-free-vector.jpg"
                    alt={`Profile of ${comment.user.username}`}
                    className="size-12 rounded-full ml-3 bg-gray-50"
                  />

                  <div className="flex flex-col">
                    <p className="font-medium">{comment.user.username}</p>
                    <time className="text-gray-500 text-sm">
                      {new Date(comment.createdAt).toLocaleDateString("en-gb", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </time>

                    <p className="font-sans text-md mt-1">{comment.content}</p>
                  </div>


                  
                  {/* Delete & Update Button*/ 
                  }
                  <div className="flex flex-col w-fit ml-auto ">

                  
                    <div className="ml-auto flex justify-center items-center flex-col gap-3 ">
                      <button
                        type="button"
                        onClick={() => HandleDeleteComment(comment.id)}
                        className="h-8 text-xs cursor-pointer max-w-fit w-fit rounded-md outline-neutral-950 outline px-5 font-medium text-black transition active:scale-110"
                      >
                        <i className="fa-solid fa-xmark"></i>
                      </button>

                      <button
                        className="h-8 text-xs cursor-pointer max-w-fit w-fit rounded-md bg-neutral-950 px-5 font-medium text-white transition active:scale-110"
                        type="button"
                        onClick={() => HandleSelectCommentId(comment.id)}  // Only gives the comment id, doesn't display the form
                        >
                        <i  className="fa-solid fa-pen"></i>
                      </button>
                    </div>


                    {showForm && selectCommentId === comment.id && (  
                      <div className="w-full max-w-full" >
                      <form 
                        onSubmit={(e) => HandleUpdateComment(e, comment.id)}  
                        className="flex flex-col justify-center items-center max-w-full w-full">  {/* Update Comment */}

                        <label htmlFor="updatedContent"></label> 
                        <input
                          className="w-fit p-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-950"
                          id="updatedContent"
                          name="updatedContent"
                          placeholder="Share your thoughts"
                          type="text"
                          value={updatedContent}
                          onChange={(e) => setUpdatedContent(e.target.value)}
                          required
                        />
                        <button
                          type="submit"
                          className="h-10 cursor-pointer  rounded-md bg-neutral-950 px-4 text-sm font-medium text-neutral-50 transition active:scale-110 lg:px-6 md:text-base"
                        >
                          Update comment
                        </button>
                        <div className="flex w-full  flex-col">
                          
                        </div>
                      </form>

                        {/* Displaying success and error messages */}
                        {updateSuccess && <p className="text-center mt-1 font-rubik">{updateSuccess}</p>}
    
                        {updateCommentError && <p className="text-center font-poppins text-red-400">{updateCommentError}</p>}
                    </div>
                    )}
                
                  
                  </div>



              

                </div>

              );
            })}
          </div>
        </div>



    </main>
    
    
    
    
    </>
  )
}

export default AdminBlogPage



//TODO Implement delete and update comment for Admin

//TODO CREATE, UPDATE & DELETE Post 

//TODO Toggle button to publish and unpublish post