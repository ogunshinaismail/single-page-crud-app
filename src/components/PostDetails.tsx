import axios from 'axios';
import Close from '../assets/close.svg'
import { Item } from '../types';
import EditPost from './EditPost';
import { useState } from 'react';

type propType = {
    viewPost: boolean;
    setViewPost: (viewPost: boolean) => void; 
    singlePost: Item
}

const PostDetails = ({setViewPost, viewPost, singlePost} : propType) => {
    const [ editPostModal, setEditPostModal ] = useState(false)

    const handleClose = () => {
        setViewPost(!viewPost)
    }

    const handleEditPost = () => {
        setEditPostModal(!editPostModal)
    }

    const handleDeleteRequest = async (id: number) => {
        const apiUrl = `https://esocity.onrender.com/posts/${id}`;
        try {
          const response = await axios.delete(apiUrl);
          console.log('Delete Response:', response.data);
          window.location.reload()
        } catch (error: any) {
          // Handle errors
          console.error('Error:', error.message);
        }
    };
    
  return (
    <div className="absolute top-0 left-0 w-full bg-[#0000002c]">
        <div className="flex justify-center items-center my-16">
            <div className="w-11/12 md:w-10/12 lg:w-5/12 mx-auto bg-white px-5 py-12 relative flex flex-col gap-8">
                <img src={Close} alt="" className='absolute top-4 right-4 cursor-pointer' onClick={handleClose} />
                <div className='flex flex-col gap-1'>
                    <h1 className="text-sm font-semibold">{singlePost?.title}</h1>
                    {/* <p className="text-lg fontsemi">Lorem ipsum dolor sit consectetur </p> */}
                </div>

                <div className='flex flex-col gap-1'>
                    <h1 className="text-sm font-semibold">Featured Images</h1>
                    <img src={singlePost?.image} alt="" className='w-full h-[250px] object-cover' />
                </div>

                <div className='flex flex-col gap-1'>
                    <h1 className="text-sm font-semibold">Post Category</h1>
                    <p className="text-sm font-semibold">{singlePost?.category}</p>
                </div>

                <div className='flex flex-col gap-1'>
                    <h1 className="text-sm font-semibold">Post Description</h1>
                    <p className="text-base font-light">{singlePost?.description}</p>
                </div>

                <div className="flex items-center gap-4">
                    <button className="bg-[#6C6C6C] text-white py-3.5 px-6 rounded-lg" onClick={handleEditPost}>Edit Post</button>
                    <button className='bg-[#0045F6] text-white py-3.5 px-6 rounded-lg' onClick={ () => handleDeleteRequest(singlePost.id)}>Delete</button>
                </div>
            </div>
        </div>

        {editPostModal ? 
            <EditPost 
                setEditPostModal={setEditPostModal} 
                editPostModal={editPostModal}  
                id={singlePost.id} 
                // title={singlePost?.title}
                // category={singlePost?.category}
                // description={singlePost?.description}
            /> 
        : null}

    </div>
  )
}

export default PostDetails