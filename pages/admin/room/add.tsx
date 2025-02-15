import axios, { AxiosResponse } from 'axios'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { DashboardLayout } from '../../../components/dashboard-layout'
import useProducts from '../../../hook/use-product'
import useCategory from '../../../hook/useCategory'
import Head from 'next/head'
// import App from '../../../components/CkEditor'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { json } from 'stream/consumers'
import AdminShowForPermissionLayout from '../../../components/Layout/AdminShowForPermissionLayout'

const App = dynamic(() => import('../../../components/CkEditor'), {
  ssr: false
})

type Props = {}

type formInput = {
  basic: string,
  category: string,
  description: string,
  image: any[],
  image0: string,
  image1: string,
  image2: string,
  image3: string,
  image4: string,
  // image5: string,
  // image6: string,
  // image7: string,
  // image8: string,
  // image9: string,
  // price10: string,
  name: string
  // price: [
  //   {
  //     brand: number,
  //     title: string,
  //     value: number
  //   }
  // ]
  price0: number,
  price1: number,
  price2: number,
}

const AddRoom = (props: Props) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const router = useRouter();
  const room = useProducts("")
  const category = useCategory()
  const [loading, setLoading] = React.useState(true)
  const [editorLoaded, setEditorLoaded] = React.useState(false);
  const [desc, setdesc] = React.useState("");
  const [image, setImage] = React.useState([])

  function parentCallBack(child: any) {
    setdesc(child)
    return child
  }

  function getDesc() {

  }

  function addFileInput() {

  }

  React.useEffect(() => {
    setEditorLoaded(true);
  }, []);
  const themsp: SubmitHandler<any> = (data: formInput) => {
    const newdata: any = {
      // ...data,
      category: data.category,
      description: desc,
      name: data.name,
      price: [
        {
          brand: 0,
          title: "Giá theo ngày",
          value: data.price0
        },
        {
          brand: 1,
          title: "Giá qua đêm",
          value: data.price1
        },
        {
          brand: 2,
          title: "Giá theo giờ",
          value: data.price2
        },
      ],
      image0: data.image0,
      image1: data.image1,
      image2: data.image2,
      image3: data.image3,
      image4: data.image4
    }
    console.log(newdata)
    const file = [
      newdata.image0[0],
      newdata.image1[0],
      newdata.image2[0],
      newdata.image3[0],
      newdata.image4[0]
    ]
    setLoading(false)
    const previewFile: any[] = [];

    const uploadFile = async (count: any, index: any) => {
      let i = index; //0
      const newFiles = file.filter((item) => item ? item : '')
      const formData = new FormData()
      formData.append('file', newFiles[i]) //newFiles[0]
      formData.append("upload_preset", "hzeskmhn")
      await axios({
        url: 'https://api.cloudinary.com/v1_1/dkhutgvlb/image/upload',
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-formendcoded",

        }, data: formData,
      })
        .then((res) => previewFile.push(res.data.url))
        .then(() => {
          if (i == count) {
            newdata.image = previewFile
            // newdata.description = desc
            try {
              room.add(newdata).then(() => {
                setLoading(true)
                router.push("/admin/room")
              }
              )
            } catch (error) {
              console.log(error);
            }
          }
        })
        .then(() => {
          if (i < count) {
            i++;
            uploadFile(count, i)
          }
          return;
        })
    }
    uploadFile(file.filter((item) => item ? item : '').length - 1, 0)
  }

  return (
    <>
      <Head>
        <title>Thêm phòng</title>
      </Head>
      <div className='flex w-[100vh] min-w-full items-center justify-center'>
        <form onSubmit={handleSubmit(themsp)} className='m-4 p-4 shadow-xl rounded w-full'>
          <div className="relative z-0 mb-6 w-full group">
            <input type="text" {...register("name")} name="name" id="name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
            <label htmlFor="name" className="z-50 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Tên phòng</label>
          </div>
          <div className='flex'>
            <div className="relative z-0 mb-6 w-full group">
              <input type="number" {...register('price0')} name="price0" id="price" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
              <label htmlFor="price" className="z-50 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Giá theo ngày</label>
            </div>
            <div className="relative z-0 mb-6 w-full group mx-[30px]">
              <input type="number" {...register("price1")} name="price1" id="price" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
              <label htmlFor="price" className="z-50 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Giá qua đêm</label>
            </div>
            <div className="relative z-0 mb-6 w-full group">
              <input type="number" {...register("price2")} name="price2" id="price" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
              <label htmlFor="price" className="z-50 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Giá theo giờ</label>
            </div>
          </div>
          <div className={`relative z-0 mb-6 w-full group overflow-hidden ${room.data ? "border rounded-md" : ""}`}>
            <p className="block p-2 mb-2 text-sm font-medium text-gray-900 dark:text-gray-300 bg-[#ccc]">Ảnh phòng</p>
            <div className="grid grid-cols-5 gap-y-3 place-items-center	select-none p-5">
              <div className='relative cursor-pointer p-5 border border-dashed rounded hover:bg-[#ccc] duration-300 hover:shadow-xl' onClick={() => addFileInput()}>
                <input {...register(`image0`)} multiple name="image0" className="absolute invisible" id="file_input" type="file" />
                <label htmlFor="file_input">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                </label>
              </div>

              <div className='relative cursor-pointer p-5 border border-dashed rounded hover:bg-[#ccc] duration-300 hover:shadow-xl' onClick={() => addFileInput()}>
                <input {...register(`image1`)} name="image1" className="absolute invisible" id="file_input1" type="file" />
                <label htmlFor="file_input1">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                </label>
              </div>

              <div className='relative cursor-pointer p-5 border border-dashed rounded hover:bg-[#ccc] duration-300 hover:shadow-xl' onClick={() => addFileInput()}>
                <input {...register(`image2`)} name="image2" className="absolute invisible" id="file_input2" type="file" />
                <label htmlFor="file_input2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                </label>
              </div>

              <div className='relative cursor-pointer p-5 border border-dashed rounded hover:bg-[#ccc] duration-300 hover:shadow-xl' onClick={() => addFileInput()}>
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
                  <option key={index} value={item._id}>{item?.name}</option>
                )
              })}
            </select>
          </div>

          <div className="relative z-0 mb-6 w-full group">
            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Mô tả phòng</label>
            <App
              getDesc={getDesc}
              parentCallBack={parentCallBack} />
          </div>
          <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
        </form>
      </div>
    </>
  )
}

AddRoom.Layout = AdminShowForPermissionLayout;
export default AddRoom