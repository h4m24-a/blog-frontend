import Navbar from "../components/navbar";
import Footer from "../components/footer";
import getSinglePost from "../api/singlePost";
import deleteComment from "../api/deleteComment";
import updateComment from "../api/updateComment";
import { useParams } from "react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useAuthContext } from "../context/useAuthContext";


const BlogPage = () => {

  const [content, setContent] = useState("");
  const [success, setSuccess] = useState("");
  const [commentError, setCommentError] = useState("");
  const [validationError, setValidationError] = useState({})
  
  const [updatedContent, setUpdatedContent] = useState("")
  const [updateCommentError, setUpdateCommentError] = useState("");
  const [updateValidationError, setUpdateValidationError] = useState({})
  const [updateSuccess, setUpdateSucess] = useState("")
  const [selectCommentId, setSelectCommentId] = useState()

  const [showForm, setShowForm] = useState(false)

  const { accessToken, userId } = useAuthContext();
  const queryClient = useQueryClient()
  const { postId } = useParams();


  const { data: post, isLoading, isError, error } = useQuery( {
    queryKey: ["post"],
    queryFn: () => getSinglePost(accessToken, postId),   // token from auth context global state
    enabled: !!accessToken                              // Ensures the query only runs if accessToken exists
  });



  useEffect(() => {
    // clear updatedComment input when selected id changes
    setUpdatedContent("")
    setUpdatedContent("")
    setUpdateCommentError("")
    setUpdateValidationError("")
    setUpdateSucess("")
  }, [selectCommentId])  // This hook runs whenever selectCommentId changes
  

  // Loading state: show loading indicator while data is being fetched
  if (isLoading || !post) {
    return <div>Loading post...</div>;
  }



  // Error state: show error message if the query fails
  if (isError) {
    return <div>{error.message}</div>;
  }





  const HandleCommentPost = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch(
        `http://localhost:3000/api/posts/${postId}/comments`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ content }),
        }
      );

      const data = await response.json();


      // Validation errors
      if (response.status === 400) {

      const commentErr = {}  // Initializes an empty object

      // convert error into an object
      data.errors.forEach(err => {  // iterate over each error
        commentErr[err.path] = err.msg   // eg: commentErr["content"] = "comment error message"
      })

      console.log(commentErr);
      setValidationError(commentErr);
      setSuccess("");
      setCommentError("")
      return
      }


      if (response.status === 201) {
        setSuccess(data.message)
        setContent("")
        setCommentError("")
        setValidationError("")
        // Invalidate the post query to refetch post data and comments
        queryClient.invalidateQueries(["post"])
      }



    } catch (error) {
      setCommentError(error.message);
      setSuccess("")
    }
  }





  const HandleDeleteComment = async (commentId) => {
    const alertYes = window.confirm("Do you want to delete this comment?")

    if (alertYes) {

      try {
        await deleteComment(accessToken, postId, commentId);

        queryClient.invalidateQueries(["post"])
      } catch (error) {
        console.log(error)
        throw new Error(error)
      }
    }
  }




  const HandleUpdateComment = async (e, commentId) => {
    e.preventDefault(e)

    try {
      const response = await updateComment(accessToken, postId, commentId, updatedContent)



      // Form validation errors
      if (response.status === 400) {

        const updatedCommentErr = {}

        // convert error into an object
        response.data.errors.forEach(err => {  // iterate over each error
          updatedCommentErr[err.path] = err.msg;  // eg: updatedCommentErr["updatedContent"] = "comment error msg, must be above 3 characters"
        })

        setUpdateValidationError(updatedCommentErr);
        setUpdateSucess("");
        setUpdatedContent("")
        setUpdateCommentError("")
        setSuccess("")
        console.log(updatedCommentErr)
        return;
      }


      // If successfull
      if (response.status === 200) {
        setUpdatedContent(response.data.updatedComment);
        setUpdateSucess(response.data.message);
        setUpdateCommentError("");
        setUpdateValidationError("")
        setUpdatedContent("")
        setShowForm(false)

        // Invalidate the post query to refetch and displayed post data and comments
        queryClient.invalidateQueries(["post"]);
        console.log(updatedContent)
        console.log(updateSuccess)
      }
      
      


    } catch (error) {
      setUpdateCommentError(error.message)
      setUpdatedContent('');
      setUpdateValidationError('')
      throw new Error(error)
    }
  }


  const HandleSelectCommentId = (commentId) => {
    setSelectCommentId(commentId)
    setShowForm(!showForm)
    setUpdateSucess("");
    setCommentError("");
    setUpdateValidationError("")
  }




  return (
    <>
      <Navbar />
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

            <div className="comment-input">
              <form onSubmit={HandleCommentPost}>     {/* Add Comment Form */}
                <label htmlFor="content"></label>
                <input
                  className="comment-content"
                  id="content"
                  name="content"
                  placeholder="Share your thoughts"
                  type="text"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                />
                <div className="flex justify-end flex-col">
                <button type="submit" className="inline-flex self-start  h-10 mt-2 cursor-pointer mb-7 items-center justify-center rounded-md bg-neutral-950 px-6 font-medium text-neutral-50 transition active:scale-110 ">Post comment</button>

                
                {commentError && <p className="text-center font-sans  text-red-400" > {commentError} </p>}

                {validationError.content &&  (
                  <p className="text-center mt-1.5 font-sans  text-red-400">{validationError.content} </p>
                )}

                {success && <p className=" text-center "> {success} </p>}


                </div>
              </form>
            </div>
            {post?.comments.map((comment) => {
              // Using the comment's index to assign each comment an image.
              // const profImg = profileImages[index % profileImages.length];  // profileImages.length is 8.  Value will never be above length of 8.  Original index is the remainder if it can't divide.

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



                  <div className="flex flex-col w-fit ml-auto ">

                  {comment.user.id === userId && (  // Only displays buttons to the user who made the comment
                  
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
                        onClick={() => HandleSelectCommentId(comment.id)}
                      >
                        <i  className="fa-solid fa-pen"></i>
                      </button>
                    </div>
                  )}

                  {showForm && selectCommentId === comment.id && (      // Shows update form for selected comment
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
                          {/* Displaying success and error messages */}
                          {updateSuccess && <p className="text-center">{updateSuccess}</p>}
                          {updateCommentError && <p className="text-center font-sans text-red-400">{updateCommentError}</p>}
                          {updateValidationError.updatedContent && (
                            <p className="text-center text-sm mt-1.5 text-1 font-sans text-red-400">{updateValidationError.updatedContent}</p>
                          )}
                        </div>
                      </form>
                    </div>
                  )}
                  </div>

                </div>

              );
            })}
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
};

export default BlogPage;


// form component?