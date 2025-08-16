const CommentForm= ({ HandleFunction, label, value, onChange }) => {

  <form onSubmit={HandleFunction}>
    <label htmlFor="content"></label>
    <input
      className="comment-content"
      id="content"
      name="content"
      placeholder="Share your thoughts"
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required
    />
    <div className="flex justify-end flex-col">
      <button
        type="submit"
        className="inline-flex self-start  h-10 mt-2 cursor-pointer mb-7 items-center justify-center rounded-md bg-neutral-950 px-6 font-medium text-neutral-50 transition active:scale-110 "
      >
        {label}
      </button>

      
    </div>
  </form>
}



export default CommentForm;