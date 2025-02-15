/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react'
import {faMoon, faHourglassStart, faHouseChimney} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import useBlog from '../../hook/use-blog'
import { Blog } from '../../types/blog'
import useCategoryBlog from '../../hook/use-categoryBlog'
import { CategoryBlog, CategoryWithBlog } from '../../types/categoryBlog'
import dayjs from 'dayjs'
import Head from 'next/head'
import BlogSidebar from '../../components/BlogSidebar'

type Props = {}

const BlogPage = (props: Props) => {
    const { data: dataBlogs } = useBlog();
    const { data: cateBlog } = useCategoryBlog();

    // 5 bài blog mới nhất.
    const [data5Blog, setData5Blog] = useState<Blog[]>([]);
    // ds blog theo danh mục.
    const [categoryWithBlog, setCategoryWithBlog] = useState<CategoryWithBlog[]>([]);

    // lấy 5 blog mới nhất
    useEffect(() => {
        setData5Blog(dataBlogs?.slice(0, 5));
    }, [dataBlogs]);

    // lấy danh sách danh mục blog và danh sách blog tương ứng.
    useEffect(() => {
        if (dataBlogs?.length && cateBlog?.length) {
            // lặp mảng category blog => filter lấy ra blog theo category
            const categoryWithBlog = cateBlog.map((cate: CategoryBlog) => {
                const blogByCate = dataBlogs.filter((blog: Blog) => blog.category._id === cate._id);
                
                return {
                    ...cate,
                    blogs: blogByCate
                }
            });

            setCategoryWithBlog(categoryWithBlog);
        }
    }, [dataBlogs, cateBlog]);

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

    if (!dataBlogs) return <div className='w-[80%] mx-auto py-2'>Loading...</div>;

    return (
        <>
            <Head>
                <title>Bài viết</title>
            </Head>
            <div className='w-[80%] mx-auto py-2'>
                <div className="blog-img__total flex gap-1 mb:flex mbs:block">
                    {/* check xem có data chưa. */}
                    {data5Blog && data5Blog[0] && (
                        <Link href={`/blog/${data5Blog[0].slug}`}>
                            <div className="w-[50%] relative cursor-pointer mb:w-[50%] mbs:w-[100%]">
                                <div className='absolute bottom-0 left-0 right-0 text-white font-semibold leading-tight p-3'>
                                    <h2 className='limit-2 text-lg'>{data5Blog[0].title}</h2>
                                </div>
                                <img src={data5Blog[0].image} className='w-full h-full object-cover' alt="" />
                            </div>
                        </Link>
                    )}

                    <div className="grid w-[50%] grid-cols-2 gap-1 mb:w-[50%] mbs:w-[100%]">
                        {data5Blog?.slice(1).map((blog, index) => (
                            <Link key={index} href={`/blog/${blog.slug}`}>
                                <div className="relative cursor-pointer">
                                    <div className='absolute bottom-0 left-0 right-0 text-white font-semibold leading-tight p-3'>
                                        <h2 className='limit-2 text-lg'>{blog.title}</h2>
                                    </div>
                                    <img src={blog.image} className='w-[300px] h-[300px] object-cover block' alt={blog.title} />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="mt-[50px] flex items-start mb-10">
                    <div className="w-[75%] pr-5 mb:w-[75%] mbs:w-[100%] ">
                        {categoryWithBlog?.map((item, index) => {
                            if (item.blogs.length) {
                                return (
                                    <div className='mb-10' key={index}>
                                        <div>
                                            <Link href={`/blog/danh-muc/${item.slug}`}>
                                                <h2 className='inline-block text-2xl font-semibold text-[#FFA500] cursor-pointer uppercase'>{item.name}</h2>
                                            </Link>
                                            <div className="mt-[5px] w-[100%] h-[3px] bg-[#ddd] relative">
                                                <div className="absolute top-0 left-0 bottom-0 right-[700px] bg-[#FFA500]"></div>
                                            </div>
                                        </div>
                                        <div className="flex gap-5 mb:flex mbs:block">
                                            <div className="mt-[30px] w-[55%] mb:w-[55%] mbs:w-[100%]">
                                                <Link href={`/blog/${item.blogs[0].slug}`}>
                                                    <div className="cursor-pointer">
                                                        <img src={item.blogs[0].image} className='w-full h-[400px] object-cover' alt={item.blogs[0].title} />
                                                    </div>
                                                </Link>
                                                <div className="pt-[10px]">
                                                    <Link href={`/blog/${item.blogs[0].slug}`}>
                                                        <h3 className='text-2xl font-semibold hover:text-[#FFA500] cursor-pointer limit-2'>{item.blogs[0].title}</h3>
                                                    </Link>
                                                </div>
                                                <div className="flex gap-5 mt-[10px]">
                                                    <p className='text-[#8a8a8a]'>by <span className='hover:text-[#FFA500]'>{item.blogs[0].user?.name}</span></p>
                                                    <p className='text-[#8a8a8a]'>{formatDate(item.blogs[0]?.createdAt)}</p>
                                                </div>
                                                <div className="pt-[10px] limit-3">
                                                   {item.blogs[0].desc} 
                                                </div>
                                                <div className="pt-[10px]">
                                                    <Link href={`/blog/danh-muc/${item.slug}`}>
                                                        <p className='text-[#ff6400] hover:opacity-[0.7] cursor-pointer'>View All</p>
                                                    </Link>
                                                </div>
                                            </div>
                                            
                                            <div className="mt-[22px] w-[45%] mb:w-[45%] mbs:w-[100%]">
                                                <div className="grid grid-cols-1 divide-y">
                                                    {item.blogs.slice(1, 5).map((blog, index) => (
                                                        <div className="flex gap-3 py-2" key={index}>
                                                            <Link href={`/blog/${blog.slug}`}>
                                                                <div className="cursor-pointer">
                                                                    <img src={blog.image} className='w-[150px] h-[150px] object-cover' alt={blog.title} />
                                                                </div>
                                                            </Link>
                                                            <div className="flex-1">
                                                                <Link href={`/blog/${blog.slug}`}>
                                                                    <h2 className='leading-6 text-lg font-semibold hover:text-[#FFA500] cursor-pointer limit-3'>{blog.title}</h2>
                                                                </Link>
                                                                <p className='pt-[10px]'>{formatDate(blog.createdAt)}</p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        })}
                    </div>

                    <div className="sticky top-[100px] w-[25%] pl-2 mb:block mbs:hidden">
                        <BlogSidebar />
                    </div>
                </div>
            </div>
        </>
    )
}

export default BlogPage