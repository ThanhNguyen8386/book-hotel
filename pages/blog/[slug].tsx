/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import BlogSidebar from '../../components/BlogSidebar'
import Link from 'next/link'
import { useRouter } from 'next/router'
import useBlog from '../../hook/use-blog'
import Head from 'next/head'
import dayjs from 'dayjs'

type Props = {}

const BlogDetail = (props: Props) => {
  const router = useRouter();
  const { slug } = router.query;

  const { data: blogDetail } = useBlog(slug as string);

  const formatDate = (date?: Date) => {
    let monthToText;
    const month = new Date(date!).getMonth() + 1;
    switch ((month)) {
      case 1:
        monthToText = "Một";
        break;
      case 2:
        monthToText = "Hai";
        break;
      case 3:
        monthToText = "Ba";
        break;
      case 4:
        monthToText = "Tư";
        break;
      case 5:
        monthToText = "Năm";
        break;
      case 6:
        monthToText = "Sáu";
        break;
      case 7:
        monthToText = "Bảy";
        break;
      case 8:
        monthToText = "Tám";
        break;
      case 9:
        monthToText = "Chín";
        break;
      case 10:
        monthToText = "Mười";
        break;
      case 11:
        monthToText = "Mười Một";
        break;
      case 12:
        monthToText = "Mười Hai";
        break;
      default:
        break;
    }
    return dayjs(date).format(`DD [Tháng] [${monthToText}], YYYY`);
  }

  if (!blogDetail) return (
    <>
      <Head>
        <title>Blog</title>
      </Head>

      <div className='w-[80%] mx-auto py-2'>Loading...</div>
    </>
  )

  return (
    <>
      <Head>
        <title>{blogDetail.title}</title>
      </Head>

      <div className='w-[80%] mx-auto py-2'>
        <div className="blog-img__total flex items-center gap-3 mb:flex mbs:block py-2">
          <Link href="/">
            <span className='hover:text-[#FFA500] cursor-pointer'>Trang chủ</span>
          </Link>
          <FontAwesomeIcon icon={faChevronRight} className='text-xs mt-1'/>

          <Link href="/blog">
            <span className='hover:text-[#FFA500] cursor-pointer'>Blog</span>
          </Link>
          <FontAwesomeIcon icon={faChevronRight} className='text-xs mt-1'/>

          <Link href={`/blog/danh-muc/${blogDetail.category?.slug}`}>
            <span className='hover:text-[#FFA500] cursor-pointer'>{blogDetail.category?.name}</span>
          </Link>
          <FontAwesomeIcon icon={faChevronRight} className='text-xs mt-1'/>

          <span>{blogDetail.title}</span>
        </div>

        <div className="mt-[20px] flex items-start mb-10">
          <div className="w-[75%] pr-5 mb:w-[75%] mbs:w-[100%]">
            <div>
              <h2 className='text-2xl font-semibold text-[#FFA500]'>{blogDetail.title}</h2>
              <div className="flex gap-5 mt-[5px]">
                <p className='text-[#8a8a8a]'>by <span className='hover:text-[#FFA500]'>{blogDetail.user?.name}</span></p>
                <p className='text-[#8a8a8a]'>{formatDate(blogDetail.createdAt)}</p>
              </div>
            </div>
              
            {/* content */}
            <div>
              <div className='my-3'>
                <img src={blogDetail.image} alt={blogDetail.title} className="w-full h-[400px] object-cover" />
              </div>

              <div dangerouslySetInnerHTML={{__html: blogDetail.content }}></div>
            </div>
          </div>

          <div className="sticky top-[100px] w-[25%] pl-2 sticky top-[100px] w-[25%] pl-2 mb:block mbs:hidden">
            <BlogSidebar />
          </div>
        </div>
      </div>
    </>
  )
}

export default BlogDetail