import { useState } from 'react'
import AddPost from './AddPost'
import SinglePost from './SinglePost'
import PostDetails from './PostDetails'
import useFetch from '../hooks/useFetch'
import axios from 'axios'
import { Item } from '../types'

const Home = () => {
    const [ addPostModal, setAddPostModal ] = useState(false)
    const [ viewPost, setViewPost ] = useState(false)
    const [ singlePost, setSinglePost ] = useState<Item>()
    const apiUrl = 'https://esocity.onrender.com/posts';
    const { data } = useFetch(apiUrl);  

    type postResponse = {
      id: number,
      title: string,
      category: string,
      image: string,
      description: string
    }

    const defaultData = {
      id: 0,
      title: "No data",
      category: "No data",
      image: "No data",
      description: "No data"
    }

    const handleAddPost = () => {
        setAddPostModal(!addPostModal)
    }

    const handleViewPost = (id: number) => {
        setViewPost(!viewPost)
        // setSinglePost(data)
        const fetchData = async () => {
            try {
              const response = await axios.get(`https://esocity.onrender.com/posts/${id}`);
              setSinglePost(response.data);
            } catch (error) {
              return error;
            }
          };
      
          fetchData();
    }

  return (
    <div className="w-11/12 md:w-10/12 lg:w-7/12 mx-auto">
        <div className="flex justify-end mt-8">
            <button className='bg-[#0045F6] text-white py-3.5 px-6 rounded-lg' onClick={handleAddPost}>New Post</button>
        </div>
        <div className="bg-white px-4 py-8 my-8">
            <div className="flex flex-col gap-4">
                {data && data.map((data: postResponse, index: number) => (
                    <SinglePost data={data} key={index} handleViewPost={handleViewPost} />
                ))}
            </div>
        </div>

        {addPostModal ? <AddPost setAddPostModal={setAddPostModal} addPostModal={addPostModal} /> : null}
        {viewPost ? <PostDetails setViewPost={setViewPost} viewPost={viewPost} singlePost={singlePost ?? defaultData} /> : null}
    </div>
  )
}

export default Home