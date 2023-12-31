import { useState } from 'react';
import Close from '../assets/close.svg'
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from 'axios';

type propType = {
    addPostModal: boolean;
    setAddPostModal: (addPostModal: boolean) => void; 
}

const AddPost = ({setAddPostModal, addPostModal} : propType ) => {
    const [image, setImage] = useState('');
    const [isSuccessfull, setisSuccessfull] = useState(false);
    const [isImageLoading, setIsImageLoading] = useState(false);
    const [isImageError, setIsImageError] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const uploadImage = async (files: any) => {
        const formData = new FormData();
        setIsImageLoading(true)
        setisSuccessfull(false)
        formData.append("file", files[0]);
        formData.append("upload_preset", "mqkob0kg");
        try {
            const response = await axios.post('https://api.cloudinary.com/v1_1/dwaaixvxk/image/upload', formData);
            // Handle the response
            if(response.status === 200 || 201) {
                setImage(response.data.secure_url);
                setisSuccessfull(true)
                setIsImageLoading(false)
            }
            // console.log('Response:', response.data);
          } catch (error: any) {
            // Handle errors
            setIsImageError(true)
            // console.error('Error:', error.message);
          }
    };

    // console.log(image);

    const handleClose = () => {
        setAddPostModal(!addPostModal)
    }

    const validationSchema = z.object({
        title: z.string().min(1, { message: "Title is required" }),
        category: z.string().min(1, { message: "Category is required" }),
        description: z.string().min(1, { message: "Description is required" }),
        isImage: z.boolean().default(true),
  });

  type ValidationSchema = z.infer<typeof validationSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(validationSchema),
    defaultValues: {
        title: '',
        category: '',
        isImage: true,
        description: '',
        date: new Date(),
      },
  });

  const onSubmit: SubmitHandler<ValidationSchema> = async (data: z.infer<typeof validationSchema>) => {
    setIsSubmitted(false)
    const imageUrl = data.isImage ? image : '';
    const body = {
        title: data.title,
        category: data.category,
        image: imageUrl,
        description: data.description,
        date: new Date()
    }

    // console.log(body)

    const apiUrl = 'https://esocity.onrender.com/posts';

    try {
        const response = await axios.post(apiUrl, body);
        // Handle the response
        if(response.status === 200 || 201) {
            setIsSubmitted(true)
        }
        console.log('Response:', response.data);
        window.location.reload()
      } catch (error: any) {
        // Handle errors
        console.error('Error:', error.message);
      }
};

  return (
    <div className="absolute top-0 left-0 w-full bg-[#0000002c]">
        <div className="flex justify-center items-center my-16">
            <div className="w-11/12 md:w-10/12 lg:w-5/12 mx-auto bg-white px-5 pt-12 pb-8 relative">
                <img src={Close} alt="" className='absolute top-4 right-4 cursor-pointer' onClick={handleClose} />
                <form className="flex flex-col gap-3 w-11/12 mx-auto" onSubmit= {handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold">Post Title <span className="text-[#FF1919]">*</span></label>
                        <input type="text" className="bg-[#EFEFEF] h-12 px-2 outline-none text-sm" {...register("title")} />
                        {errors.title && (
                            <p className="text-xs italic text-red-500 mt-2"> {errors.title?.message} </p>
                        )}
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold">Post Category <span className="text-[#FF1919]">*</span></label>
                        <select className="bg-[#EFEFEF] h-12 px-2 block w-full rounded-md outline-none border-0 text-sm" {...register("category")}>
                            <option value="Fashion">Tech</option>
                            <option value="Sport">Sport</option>
                            <option value="Game">Game</option>
                            <option value="Books">Books</option>
                        </select>
                        {errors.category && (
                            <p className="text-xs italic text-red-500 mt-2"> {errors.category?.message} </p>
                        )}
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold">Featured Image <span className="text-[#FF1919]">*</span></label>
                        <div className="w-full h-12 px-2 bg-[#F8F9FA] border border-dashed border-[#DEE2E6] relative">
                            < input type="file" className="w-full h-full opacity-0" onChange={(e) => uploadImage(e.target.files)} />
                            <p className="text-[#0045F6] text-sm font-normal absolute top-3.5 right-2">Browse Photo</p>
                            <p className="text-[#0045F6] text-sm font-normal absolute top-3.5 left-2">{isImageLoading ? "uploading..." : null}</p>
                            <p className="text-[#0045F6] text-sm font-normal absolute top-3.5 left-2">{isSuccessfull ? "Uploaded successfully" : null}</p>
                            <p className="text-[#0045F6] text-sm font-normal absolute top-3.5 left-2">{isImageError ? "Error uploading image...." : null}</p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold">Post Description <span className="text-[#FF1919]">*</span></label>
                        <textarea className="w-full bg-[#EFEFEF] p-2 text-sm h-40 outline-none" {...register("description")}></textarea>
                        {errors.description && (
                            <p className="text-xs italic text-red-500 mt-2"> {errors.description?.message} </p>
                        )}
                    </div>

                    <div className="mt-5">
                        <button 
                            className={!isSubmitted ? 'bg-[#0045F6] text-white py-3.5 px-6 rounded-lg' : 'bg-[#0045F6] opacity-40 text-white py-3.5 px-6 rounded-lg'} 
                            disabled={isSubmitted}
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default AddPost


// fetch(
        //   "https://api.cloudinary.com/v1_1/dwaaixvxk/image/upload",
        //   {
        //     method: "POST",
        //     body: formData,
        //   }
        // )
        //   .then((response) => response.json())
        //   .then((data) => {
        //     setImage(data.secure_url);
        //     setisSuccessfull(true)
        //     setIsImageLoading(false)
        // });