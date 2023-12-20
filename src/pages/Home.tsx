import { useState } from 'react'
import useFetch from '../hooks/useFetch'
import axios from 'axios'
import { Item } from '../types'
import SinglePost from '../components/SinglePost'
import AddPost from '../components/AddPost'
import PostDetails from '../components/PostDetails'

const Home = () => {
    const [ addPostModal, setAddPostModal ] = useState(false)
    const [ viewPost, setViewPost ] = useState(false)
    const [ singlePost, setSinglePost ] = useState<Item>()
    const apiUrl = 'https://esocity.onrender.com/posts';
    const { data } = useFetch(apiUrl); 

    // console.log(calledData)

    type postResponse = {
      id: number,
      title: string,
      category: string,
      image: string,
      description: string,
      date?: string
    }

    const defaultData = {
      id: 0,
      title: "No data",
      category: "No data",
      image: "No data",
      description: "No data",
      date: "No data"
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
            <div className="flex flex-col gap-5">
                {data ? data.map((data: postResponse, index: number) => (
                    <SinglePost data={data} key={index} handleViewPost={handleViewPost} />
                )): <p>You don't have a post</p>}
            </div>
        </div>

        {addPostModal ? 
          <AddPost 
            setAddPostModal={setAddPostModal} 
            addPostModal={addPostModal}
          /> 
          : null}
        {viewPost ? <PostDetails setViewPost={setViewPost} viewPost={viewPost} singlePost={singlePost ?? defaultData} /> : null}
    </div>
  )
}

export default Home