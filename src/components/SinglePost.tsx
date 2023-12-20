import { useState } from 'react'
import Calender from '../assets/calendar.svg'
import CalenderWhite from '../assets/calendar-white.svg'
import Dots from '../assets/dots.svg'
import DotsWhite from '../assets/white-dots-svg.svg'
import { Item } from '../types'
import { format } from 'date-fns';

type propType = {
  data: Item;
  handleViewPost: (e: number) => void
}

const SinglePost = ({data, handleViewPost}: propType) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const date = data.date as string | number | Date

  return (
    <div 
      className="border px-6 py-3.5 flex justify-between items-center rounded-lg hover:bg-[#0045F6] hover:text-white" 
      onClick={ () => handleViewPost(data?.id)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
        <div className="flex flex-col gap-2">
            <h1 className="text-sm font-semibold">{data?.title}</h1>
            <div className="flex items-center gap-2">
                {isHovered ? <img src={CalenderWhite} alt="calender-icon" className='w-3' /> : <img src={Calender} alt="" className='w-3' />}
                <p className={isHovered ? "text-white text-xs font-normal" : "text-[#797979] text-xs font-normal"}>
                  {data && format(date, 'MMMM dd, yyyy HH:mm:ss')}
                </p>
            </div>
        </div>

        {isHovered ? <img src={DotsWhite} alt="more-options" /> : <img src={Dots} alt="" />}
        {/* <img src={Dots} alt="" /> */}
    </div>
  )
}

export default SinglePost