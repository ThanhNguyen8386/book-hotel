/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import axios from 'axios'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { DashboardLayout } from '../../../components/dashboard-layout'
import useCategory from '../../../hook/useCategory'
import Head from 'next/head'
import useProducts from '../../../hook/use-product';
import useBasic from '../../../hook/use-basic'
import { useRouter } from 'next/router'
import CKeditor from '../../../components/CkEditor'
import App from '../../../components/CkEditor'
import { API_URL } from '../../../constants'

type Props = {}

type formInput = {
  category: string,
  description: string,
  image: [],
  image1: string,
  image2: string,
  image3: string,
  image4: string,
  name: string,
  price: number
}

const Detail = (props: Props) => {
  const [desc, setdesc] = React.useState("");
  const [editorLoaded, setEditorLoaded] = React.useState(false);
  const router = useRouter();
  const { slug } = router.query
  const room = useProducts(slug)
  const category = useCategory()
  const [image, setImage] = React.useState([])
  const [loading, setLoading] = React.useState(true)

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  React.useEffect(() => {
    reset(room.data)
    setEditorLoaded(true)
    setdesc(room.data?.description)
  }, [room.data])

  React.useEffect(() => {
    const imageLists = async () => {
      const data = await (await fetch(`${API_URL}/images/${room.data?.image}`)).json()
      setImage(data[0].image)
    }
    imageLists()

  }, [])

  const themsp: SubmitHandler<any> = (data: any) => {
    setLoading(false)

    const file = data.image[0]
    data.description = desc
    if (file !== 'h') {
      const formData = new FormData()
      formData.append('file', file)
      formData.append("upload_preset", "hzeskmhn")
      axios({
        url: 'https://api.cloudinary.com/v1_1/dkhutgvlb/image/upload',
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-formendcoded",
        }, data: formData,
      })
        .then((res) => {
          data.image = res.data.url
          data.description = desc
          try {
            room.edit(data).then(() => {
              setLoading(true)
            })
          } catch (error) { }
        })
    }
    else {
      data.description = desc
      try {
        room.edit(data).then(() => {
          setLoading(true)
        })
      } catch (error) { }
    }
  }

  return (
    <>
      <Head>
        <title>Sửa phòng</title>
      </Head>
      <div className='flex w-[100vh] min-w-full items-center justify-center'>
        <form onSubmit={handleSubmit(themsp)} className='m-4 p-4 shadow-xl rounded w-full'>
          <div className="relative z-0 mb-6 w-full group">
            <input type="text" {...register("name")} name="name" id="name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
            <label htmlFor="name" className="z-50 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Tên phòng</label>
          </div>
          <div className="relative z-0 mb-6 w-full group">
            <input type="number" {...register("price")} name="price" id="price" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
            <label htmlFor="price" className="z-50 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Giá phòng</label>
          </div>
          <div className={`relative z-0 mb-6 w-full group overflow-hidden ${room.data ? "border rounded-md" : ""}`}>
            <label className="block p-2 mb-2 text-sm font-medium text-gray-900 dark:text-gray-300 bg-[#ccc]" htmlFor="file_input">Ảnh phòng</label>
            <input {...register('image')} name="image" className="invisible w-full text-sm text-gray-900 bg-gray-50 cursor-pointer dark:text-gray-400 focus:outline-none" id="file_input" type="file" />
            <div className="grid grid-cols-5 gap-y-3 place-items-center	select-none">
              {room.data?.image?.map((item: any, index: any) => {
                return (
                  <img key={index} className='w-[200px] rounded' src={item} alt="" />
                )
              })}
            </div>
          </div>
          {/* image */}
          <div className={`relative z-0 mb-6 w-full group overflow-hidden ${room.data ? "border rounded-md" : ""}`}>
            <p className="block p-2 mb-2 text-sm font-medium text-gray-900 dark:text-gray-300 bg-[#ccc]">Ảnh phòng</p>
            <div className="grid grid-cols-5 gap-y-3 place-items-center	select-none p-5">
              <div className='relative cursor-pointer p-5 border border-dashed rounded hover:bg-[#ccc] duration-300 hover:shadow-xl'>
                <input {...register(`image0`)} multiple name="image0" className="absolute invisible" id="file_input" type="file" />
                <label htmlFor="file_input">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                </label>
              </div>

              <div className='relative cursor-pointer p-5 border border-dashed rounded hover:bg-[#ccc] duration-300 hover:shadow-xl'>
                <input {...register(`image1`)} name="image1" className="absolute invisible" id="file_input1" type="file" />
                <label htmlFor="file_input1">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                </label>
              </div>

              <div className='relative cursor-pointer p-5 border border-dashed rounded hover:bg-[#ccc] duration-300 hover:shadow-xl'>
                <input {...register(`image2`)} name="image2" className="absolute invisible" id="file_input2" type="file" />
                <label htmlFor="file_input2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                </label>
              </div>

              <div className='relative cursor-pointer p-5 border border-dashed rounded hover:bg-[#ccc] duration-300 hover:shadow-xl'>
                <input {...register(`image3`)} name="image3" className="absolute invisible" id="file_input3" type="file" />
                <label htmlFor="file_input3">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                </label>
              </div>

              <div className='relative cursor-pointer p-5 border border-dashed rounded hover:bg-[#ccc] duration-300 hover:shadow-xl' >
                <input {...register(`image4`)} name="image4" className="absolute invisible" id="file_input4" type="file" />
                <label htmlFor="file_input4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                </label>
              </div>
            </div>

          </div>
          <div className="relative z-0 mb-6 w-full group">
            <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Chọn một loại phòng</label>
            <select {...register('category')} id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              {category.data?.map((item: any, index: any) => {
                return (
                  <option key={index} selected={room.data?.category == item._id} value={item._id}>{item?.name}</option>
                )
              })}
            </select>
          </div>

          <div className="relative z-0 mb-6 w-full group">
            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Mô tả phòng</label>
            <textarea {...register("description")} name="description" id="description" rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Mô tả phòng..."></textarea>          </div>
          <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
        </form>
      </div>
    </>
  )
}

Detail.Layout = DashboardLayout
export default Detail