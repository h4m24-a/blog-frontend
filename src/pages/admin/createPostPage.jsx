import NavbarAdmin from "../../components/navbarAdmin"
import { useAuthContext } from "../../context/useAuthContext";
import { useState } from "react";
import createPost from "../../api/admin/createPost";


const CreatePostPage = () => {

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("");
  const [success, setSuccess] = useState("");
  const [postError, setPostError] = useState("")


  const { accessToken } = useAuthContext()


  const HandleCreatePost = async (e) => {
    e.preventDefault()


    try {
      const response = await createPost(accessToken, title, content)

    if (response.status === 201) {
      setTitle("");
      setContent("")
      setSuccess(response.data.message)
    }
      
      
    } catch (error) {
      setPostError(error.message)
      setTitle("");
      setContent("")
      setSuccess("")
    }

  }

  return (
    <>
    <NavbarAdmin />
    <main>

      <div className="flex flex-col justify-center items-center">
        <h1 className="text-2xl bg-neutral-800 rounded-xl px-8 py-3 text-white mt-2 text-center font-rubik">Create new post</h1>
      </div>

            <div className="flex mt-5 flex-col mx-auto justify-center items-center">
              <form onSubmit={HandleCreatePost} className="border-1 shadow-xl border-black rounded-md p-3">     {/* Create post Form */}

                <label htmlFor="title"></label>
                <input
                id="blog-title"
                name="title"
                placeholder="Title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                />

                <label htmlFor="content"></label>
                <textarea
                className="border-1 w-full max-w-full px-5 py-2"
                id="blog-content"
                name="content"
                placeholder="New Post"
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                />
                
                <div className="flex justify-center items-center flex-col">
                <button type="submit" className="inline-flex self-center  h-10 mt-2 cursor-pointer mb-7 items-center justify-center rounded-md bg-neutral-950 px-6 font-medium text-neutral-50 transition active:scale-110 ">Create Post</button>

                
                {success && <p className=" text-center "> {success} </p>}
                {postError && <p className="text-center font-sans  text-red-400" > {postError} </p>}


                </div>
              </form>
            </div>



    </main>


    </>
  )

}


export default CreatePostPage



// use textarea element 