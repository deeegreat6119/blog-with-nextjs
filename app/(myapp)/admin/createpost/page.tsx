import CreatePostForm from "@/app/components/CreatePostForm"

const page = () => {
  return (
    <div className="w-full">
      <CreatePostForm />

      {/* <form
        action={createPost}
        className="shadow p-4 w-full max-w-lg m-5 flex flex-col gap-2 rounded-lg"
      >
        <h3 className="font-medium text-lg">Create Post</h3>
        <input
          type="text"
          name="title"
          required
          placeholder="Title"
          className="px-3 py-2 rounded border border-slate-200"
        />
        <textarea
          name="body"
          placeholder="Body"
          rows={4}
          required
          className="px-3 py-2 rounded border border-slate-200"
        ></textarea>
        <button className="bg-slate-700 hover:bg-slate-800 px-3 py-2 rounded text-white">
          Submit
        </button>
      </form> */}
    </div>
  )
}

export default page
