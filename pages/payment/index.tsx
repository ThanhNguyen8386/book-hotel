import Link from 'next/link'
import React, { useState } from 'react'

type Props = {}

const index = (props: Props) => {
    const [indextext, setindextex] = useState(1)
    return (
        <div>
            <div className='max-w-6xl m-auto py-[50px]'>
                <h1 className='text-[30px] font-bold'>Payment Options</h1>
                <div>
                    <ul className='flex my-[20px]'>
                        <li className='pr-[35px] text-[15px]'>Creadit card</li>
                        <li className='pr-[35px] text-[15px]'>Online banking</li>
                        <li className='pr-[35px] text-[15px]'>Payment Partners</li>
                    </ul>
                </div>
                <div className='flex my-[50px]'>
                    <div className='w-3/5 mr-[50px]'>
                        <div className='flex'>
                            <Link href={`/payment`}>
                                <button className='pr-[35px]' onClick={() => { setindextex(1) }} >
                                    <img width={87} className={`${indextext == 1 ? 'text-[red] border-b-[2px] border-[red] py-[17px]' : "py-[17px]"}`} src='https://res.cloudinary.com/dkrifqhuk/image/upload/v1665730160/asm/1920px-Visa_2021.svg_ymj3ep.png' alt="" />
                                </button>
                            </Link>
                            <Link href={`/payment`}>
                                <button className='pl-[65px]' onClick={() => { setindextex(2) }} >
                                    <img width={120} className={`${indextext == 2 ? 'text-[red]  border-b-[2px] border-[red] py-[15px]' : "py-[15px]"}`} src='https://res.cloudinary.com/dkrifqhuk/image/upload/v1665730465/asm/PayPal_logo_pmzltf.svg' alt="" />
                                </button>
                            </Link>

                        </div>
                        {/* Form Payment */}
                        <div>
                            <div className="mt-[50px]">
                                {/* <div className="md:col-span-1">
                                    <div className="px-4 sm:px-0">
                                        <h3 className="text-lg font-medium leading-6 text-gray-900">Personal Information</h3>
                                        <p className="mt-1 text-sm text-gray-600">Use a permanent address where you can receive mail.</p>
                                    </div>
                                </div> */}
                                <div className="mt-5 md:col-span-2 md:mt-[30px]">
                                    <form action="#" method="POST">
                                        <div className="overflow-hidden shadow sm:rounded-md">
                                            <div className="bg-white px-4 py-5 sm:p-6">
                                                <div className="grid grid-cols-6 gap-6">
                                                    <div className="col-span-6 sm:col-span-3">
                                                        <label className="block text-sm font-medium text-gray-700">First name</label>
                                                        <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                                                    </div>

                                                    <div className="col-span-6 sm:col-span-3">
                                                        <label className="block text-sm font-medium text-gray-700">Last name</label>
                                                        <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                                                    </div>

                                                    <div className="col-span-6 sm:col-span-4">
                                                        <label className="block text-sm font-medium text-gray-700">Email address</label>
                                                        <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                                                    </div>

                                                    <div className="col-span-6 sm:col-span-3">
                                                        <label className="block text-sm font-medium text-gray-700">Country</label>
                                                        <select id="country" name="country" className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                                            <option>United States</option>
                                                            <option>Canada</option>
                                                            <option>Mexico</option>
                                                        </select>
                                                    </div>

                                                    <div className="col-span-6">
                                                        <label className="block text-sm font-medium text-gray-700">Street address</label>
                                                        <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />

                                                    </div>

                                                    <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                                                        <label className="block text-sm font-medium text-gray-700">City</label>
                                                        <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                                                    </div>

                                                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                                        <label className="block text-sm font-medium text-gray-700">State / Province</label>
                                                        <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                                                    </div>

                                                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                                        <label className="block text-sm font-medium text-gray-700">ZIP / Postal code</label>
                                                        <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />

                                                    </div>
                                                </div>
                                            </div>
                                            <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                                                <button type="submit" className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Save</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        {/* </div> */}
                    </div>
                    <div className='bg-gray-400 w-[2px] h-[600px] mx-[50px]'></div>
                    <div>
                        <h1 className='text-[25px] font-bold'>Booking Samary</h1>
                        <div className='w-[270px] w-full mt-[50px]'>
                            <div className='flex py-[5px]'>
                                <p className=' w-2/3  float-left'>
                                    <span className='font-medium text-gray-500'>Hotel fee - 2 adiut</span>

                                </p>
                                <p className='float-right w-1/3 '>
                                    <span className='float-right font-medium  text-gray-500 font-serif'>00$</span>
                                </p>
                            </div>
                            <div className='flex py-[5px]'>
                                <p className=' w-2/3  float-left'>
                                    <span className='font-medium  text-gray-500'>Taxes and fees</span>

                                </p>
                                <p className='float-right w-1/3 '>
                                    <span className='float-right font-medium  text-gray-500 font-serif'>00$</span>
                                </p>
                            </div>
                            <div className='flex py-[15     px]'>
                                <p className=' w-2/3  float-left'>
                                    <span className=' font-bold text-[18px] text-orange-500'>Subtotal</span>

                                </p>
                                <p className='float-right w-1/3'>
                                    <span className='float-right font-bold text-[18px] font-serif text-orange-500'>00$</span>
                                </p>
                            </div>
                            <div className='flex'>
                                <p className='w-2/3  float-left'>
                                    <span className='font-medium  text-gray-500'>Service tax</span>

                                </p>
                                <p className='float-right w-1/3'>
                                    <span className='float-right font-serif font-medium  text-gray-500'>00$</span>
                                </p>

                            </div>
                            <div className='flex pt-[50px]'>
                                <p className=' w-2/3  float-left '>
                                    <span className='font-bold text-[18px] text-orange-500'>Total</span>

                                </p>
                                <p className='float-right w-1/3 '>
                                    <span className='float-right font-serif font-bold text-[18px] font-serif text-orange-500'>00$</span>
                                </p>
                            </div>
                        </div>
                        <button className='float-none py-[5px] px-[15px] bg-orange-500 text-white font-medium rounded-lg mt-[30px]'>Pay now</button>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default index
