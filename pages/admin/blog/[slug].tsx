/* eslint-disable @next/next/no-img-element */
import axios from 'axios'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import Head from 'next/head'
import AdminShowForPermissionLayout from '../../../components/Layout/AdminShowForPermissionLayout'
import useCategoryBlog from '../../../hook/use-categoryBlog'
import { CategoryBlog } from '../../../types/categoryBlog'
import dynamic from 'next/dynamic'
import useBlog from '../../../hook/use-blog'
import toastr from "toastr";
import 'toastr/build/toastr.min.css';
import { useRouter } from 'next/router'

type Props = {}

type formInput = {
  title: string;
  category: string;
  image: FileList;
  desc: string;
}

const Editor = dynamic(() => import("../../../components/Editor"), { ssr: false });

const UpdateBlog = (props: Props) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<formInput>();
  const { data: cateBlog } = useCategoryBlog();
  const router = useRouter();
  const { slug }: any = router.query;
  const { data: blogDetail, edit } = useBlog(slug);

  const [content, setContent] = useState<string>("");
  const [errContent, setErrContent] = useState<string>("");
  const [preview, setPreview] = useState("/placeholder-image.jpg");
  
  useEffect(() => {
    // check blogDetail có dữ liệu chưa.
    if (blogDetail) {
      reset({
        ...blogDetail,
        category: blogDetail.category?._id,
      });
      setContent(blogDetail.content);

      // có ảnh blog => set preview.
      blogDetail.image && setPreview(blogDetail.image)
    }
  }, [blogDetail, reset]);

  // check người dùng nhập nội dung bài viết chưa.
  const validateContent = (value?: string) => {
    if (!value?.trim().length) {
      setErrContent("Vui lòng nhập nội dung bài viết");
    } else {
      setErrContent("");
    }
  }

  // ảnh preview thumbnail.
  const handleChangeThumbnail = (e: ChangeEvent<HTMLInputElement>) => {
    const file = ((e.target as HTMLInputElement).files as FileList)[0];
    setPreview(URL.createObjectURL(file));
  }

  const handleUpdateBlog: SubmitHandler<formInput> = async (data: formInput) => {
    // check validate content.
    if (errContent) return;

    // upload ảnh
    // kiểm tra có chọn ảnh không.
    let image: any = data.image;
    if (typeof data.image !== "string" && data.image.length) {
      const formData = new FormData();
      formData.append("file", data.image[0]);
      formData.append("upload_preset", "hzeskmhn");
      const { data: { url } }: any = await axios.post("https://api.cloudinary.com/v1_1/dkhutgvlb/image/upload", formData);
      image = url;
    }

    await edit({
      _id: blogDetail._id,
      title: data.title,
      content,
      desc: data.desc,
      image,
      category: data.category as any
    });

    toastr.success("Cập nhật bài viết thành công");
    router.push("/admin/blog");
  }

  return (
    <>
      <Head>
        <title>Cập nhật Blog</title>
      </Head>
      <div className='flex w-[100vh] min-w-full items-center justify-center'>
        <form onSubmit={handleSubmit(handleUpdateBlog)} className='m-4 p-4 shadow-xl rounded w-full'>
          <div className="relative z-0 mb-6 w-full group">
            <input type="text" {...register("title", { required: "Vui lòng nhập tiêu đề bài viết" })} name="title" id="title" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
            <label htmlFor="text" className="z-50 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Tiêu đề</label>
            <div className="text-sm mt-1 text-red-500">{errors.title?.message}</div>
          </div>

          <div className="relative z-0 mb-6 w-full group">
            <label htmlFor="countries" className="block mb-2 text-sm font-medium dark:text-gray-400">Danh mục bài viết</label>
            <select {...register('category', { required: "Vui lòng chọn danh mục bài viết" })} className="outline-none border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option value="">-- Chọn danh mục --</option>
              {cateBlog?.map((item: CategoryBlog, index: number) => {
                return (
                  <option key={index} value={item._id}>{item?.name}</option>
                )
              })}
            </select>
            <div className="text-sm mt-0.5 text-red-500">{errors.category?.message}</div>
          </div>

          <div className="relative z-0 mb-6 w-full group">
            <label htmlFor="content" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Mô tả ngắn</label>
            <textarea {...register("desc", { required: "Vui lòng nhập mô tả bài viết" })} id="content" rows={4} className="outline-none block p-2.5 w-full text-sm rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Mô tả ngắn..."></textarea>
            <div className="text-sm mt-0.5 text-red-500">{errors.desc?.message}</div>
          </div>

          <div className="relative z-0 mb-6 w-full group">
            <div className="relative z-0 w-full group">
              <label htmlFor="content" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Nội dung bài viết</label>
            </div>

            <Editor
              value={content}
              onChange={(v: any) => {
                setContent(v);
                validateContent(v);
              }}
            />

            <div className="text-sm mt-0.5 text-red-500">{errContent}</div>
          </div>

          <div className='mb-6'>
            <label className="block text-sm font-medium text-gray-700">Thumbnail</label>
            <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
              <div className="space-y-1 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                  >
                    <span>Upload a file</span>
                    <input
                      id="file-upload"
                      {...register("image")}
                      onChange={handleChangeThumbnail}
                      accept='image/*'
                      type="file"
                      className="sr-only"
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>

            <div className="text-sm mt-0.5 text-red-500">{errors.image?.message}</div>
          </div>

          <div className='mb-6'>
            <label className="block text-sm font-medium text-gray-700">Preview</label>
            <div className='mt-1'>
              <img src={preview} alt="" className='w-[150px] h-[150px] object-cover' />
            </div>
          </div>

          <button type="submit" onClick={() => validateContent(content)} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
        </form>
      </div>
    </>
  )
}

UpdateBlog.Layout = AdminShowForPermissionLayout;
export default UpdateBlog