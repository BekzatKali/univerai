type UserImageProps = {
    id: string,
    src: string,
    alt: string
    handleDelete: (id: string) => void
}

const UserImage = ({src, alt, id, handleDelete}: UserImageProps) => {

  const removeUserPhoto = async () => {
      const res = await fetch(`/api/upload?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        handleDelete(id);
        console.log('Image has been removed');
      }
  }

  return (
    <div className="ring-2">
        <img className='object-cover h-[400px] w-full' src={src} alt={alt} />
        <div className="p-2">
          <button className="bg-red-400 text-white px-6 py-2 rounded-md hover:bg-red-600 duration-300" onClick={removeUserPhoto}>
            Delete
          </button>
        </div>
    </div>
  )
}

export default UserImage