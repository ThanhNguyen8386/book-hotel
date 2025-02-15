/* eslint-disable @next/next/no-img-element */
import { faHouseChimney } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import React from 'react'
import useCategory from '../../hook/useCategory'
import { CategoryBlog } from '../../types/categoryBlog'

type Props = {}

const BlogSidebar = (props: Props) => {
  const { data: categoryRoom } = useCategory();

  if (!categoryRoom) return <div>Loading...</div>

  return (
    <>
      <div>
        <img src="/sansale-t12-55-sidebar-banner.jpg" className='w-[100%]' alt="" />
      </div>
      <div className="bg-[#FFA500] mt-[25px] p-2 w-[40%] text-center">
        <p className='text-white'>HOTEL LIST</p>
        <div></div>
      </div>
      <div className="border-spacing-1 border border-[#FFA500]"></div>
      <div className="mt-2 grid grid-cols-1 divide-y">
        {categoryRoom.map((cate: CategoryBlog, index: number) => (
          <div className="flex items-center gap-3 py-2" key={index}>
            <FontAwesomeIcon icon={faHouseChimney}  className='text-[#FFA500]'/>
            <Link href="">
              <p className='cursor-pointer transition hover:text-[#FFA500] hover:underline'>{cate.name}</p>
            </Link>
          </div>
        ))}
      </div>
    </>
  )
}

export default BlogSidebar