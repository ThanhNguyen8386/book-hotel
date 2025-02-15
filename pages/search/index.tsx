/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Props } from "next/script";
import Checkbox from "@mui/material/Checkbox";
import styles from "../../styles/room.module.css";
import Slider from "@mui/material/Slider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import { RoomType } from "../../types/room";
import { searchRoom } from "../../api/rooms";

function valuetext(value: number) {
  return `${value}°C`;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const SearchResult = (props: Props) => {
  const router = useRouter();
  const { query }: any = router;

  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [rooms, setRooms] = useState<RoomType[]>([]);
  const [value, setValue] = useState<number[]>([0, 100]);

  useEffect(() => {
    if (Object.keys(query).length) {
      (async () => {
        try {
          const res = await searchRoom({
            checkInDate: query.checkin,
            checkOutDate: query.checkout,
          });

          setRooms(res);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [query]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  // format tiền.
  const formatCurrency = (currency: number) => {
    const tempCurrency = +currency >= 0 ? currency : 0;
    return new Intl.NumberFormat("de-DE", { style: "currency", currency: "VND" }).format(tempCurrency);
  };

  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  return (
    <>
      <Head>
        <title>Happy Weekend Hotel</title>
      </Head>

      <div className={styles.scroll}>
        <div className="w-[80%] mx-[auto] flex flex-col mbs:w-[95%] mb:w-[80%]">
          <div className="search-filter flex justify-between">
            <div className="search"></div>
            <div className="filter my-[10px]">
              <Button onClick={handleOpen2}>
                <a className="border-current hover:text-orange-400 px-2 py-1 text-[black] my-[auto] rounded-2 bg-[#f2f2f7] rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className=" inline w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
                    />
                  </svg>
                  Bộ lọc
                </a>
              </Button>
              <Modal
                keepMounted
                open={open2}
                onClose={handleClose2}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
              >
                <Box sx={style} className={styles.box}>
                  <Typography
                    className="text-center font-bold "
                    id="keep-mounted-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Bộ lọc
                    <hr className="mt-2" />
                  </Typography>
                  <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
                    <div className="p-5 flex flex-col">
                      <div className="sort border-b border-[#d1d1d6] mb-5 pb-5">
                        <h2 className="text-2xl font-bold">Sắp xếp</h2>
                        <p>
                          <ul className="flex justify-between mt-3">
                            <li className="p-3 text-lg text-[#464648] cursor-pointer">Giá từ cao đến thấp</li>
                            <li className="p-3 text-lg text-[#464648] cursor-pointer">Giá từ thấp đến cao</li>
                          </ul>
                        </p>
                      </div>
                      <div className="price border-b border-[#d1d1d6]  mb-5 pb-5">
                        <h2 className="text-2xl font-bold mb-6">Khoảng giá</h2>
                        <Box className="w-[100%]">
                          <Slider
                            getAriaLabel={() => "Temperature range"}
                            value={value}
                            onChange={handleChange}
                            valueLabelDisplay="auto"
                            getAriaValueText={valuetext}
                          />
                        </Box>
                      </div>
                      <div className="utility ">
                        <h2 className="text-2xl font-bold">Tiện ích</h2>
                        <div className="list-utility">
                          <ul className="flex flex-wrap mbs:text-sm mb:text-xl">
                            <li className="w-[50%]">
                              <Checkbox {...label} defaultChecked />
                              <span>Wi-Fi miễn phí</span>
                            </li>
                            <li className="w-[50%]">
                              <Checkbox {...label} defaultChecked />
                              <span>Ghế tình yêu</span>
                            </li>
                            <li className="w-[50%]">
                              <Checkbox {...label} defaultChecked />
                              <span>Lễ tân 24/24</span>
                            </li>
                            <li className="w-[50%]">
                              <Checkbox {...label} defaultChecked />
                              <span>Thang máy</span>
                            </li>
                            <li className="w-[50%]">
                              <Checkbox {...label} defaultChecked />
                              <span>Tiện nghi là/ủi</span>
                            </li>
                            <li className="w-[50%]">
                              <Checkbox {...label} defaultChecked />
                              <span>Bồn tắm</span>
                            </li>
                            <li className="w-[50%]">
                              <Checkbox {...label} defaultChecked />
                              <span>Smart TV</span>
                            </li>
                            <li className="w-[50%]">
                              <Checkbox {...label} defaultChecked />
                              <span>Điều hoà</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <footer className="sticky w-[100%] h-[80px] bg-[white] border-t left-0 bottom-0 ">
                      <ul className="flex justify-between px-5 items-center text-center my-auto h-[100%] ">
                        <li>
                          <a className="cursor-pointer hover:decoration hover:underline hover:text-[#1c1c1e] hover:opacity-70">
                            Xóa tất cả
                          </a>
                        </li>
                        <li>
                          <button className="px-12 font-bold py-3 bg-orange-500 rounded-lg text-white">Lọc</button>
                        </li>
                      </ul>
                    </footer>
                  </Typography>
                </Box>
              </Modal>
              <Button onClick={handleOpen}>
                <a className=" border-current hover:text-orange-400 px-2 py-1 text-[black] my-[auto] rounded-2 bg-[#f2f2f7] rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="inline w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
                    />
                  </svg>
                  Sắp xếp
                </a>
              </Button>
              {/* model popup */}
              <Modal
                keepMounted
                open={open}
                onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
              >
                <Box sx={style}>
                  <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
                    Đây là phần sắp xếp
                  </Typography>
                  <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
                    Đây là phần nội dung sắp xếp
                  </Typography>
                </Box>
              </Modal>
            </div>
          </div>
          <div className="main bg-[#f2f2f7]  mb-[20px] flex justify-between mbs:flex-col mb:flex-row ">
            <div className={styles.content_left}>
              <div className="m-3">
                {!rooms.length ? (
                  <div>Không tìm thấy khách sạn nào phù hợp</div>
                ) : (
                  <div>
                    Có <strong>{rooms.length}</strong> khách sạn phù hợp với bạn
                  </div>
                )}
              </div>

              {rooms?.map((room, index) => (
                <Link href={`/booking_detail/${room.slug}`} key={index}>
                  <div className="card m-3 bg-[white] object-cover border rounded-lg cursor-pointer">
                    <div className="box h-[fitcontent] p-2 flex mbs:flex-col mb:flex-row">
                      <div className="img w-[33%] mr-[10px] rounded-lg overflow-hidden mbs:h-[206px] mbs:w-[100%] mb:w-[33%] mb:h-[auto] ">
                        <img
                          className="object-cover h-[100%] w-[100%]"
                          src={
                            room.image[0] || "https://s3.go2joy.vn/1000w/hotel/12563/2848_1656662865_62beab51c14f8.jpg"
                          }
                          alt={room.name}
                        />
                      </div>
                      <div className="text w-[66.6%] mbs:w-[100%] mb:w-[66.6%] flex flex-col">
                        <div className="text-top w-[100%] flex justify-between mb-2">
                          <h4 className="uppercase font-bold">{room.name}</h4>

                          <button>
                            <FontAwesomeIcon icon={faHeart} />
                          </button>
                        </div>
                        <div className="text-mid mb-[30px] ">
                          <div className="flex flex-col mb-[20px] leading-[20px] text-[#63637a] text-[16px]">
                            {room.listFacility?.map((item) => item.name).join("・")}
                          </div>
                        </div>

                        <div className="mt-auto text-bottom flex items-center justify-between">
                          <div className="flex items-center">
                            <FontAwesomeIcon icon={faStar} className="text-[#ff6400]" />

                            <div className="ml-1 text-sm">
                              {room.ratingAvg} (<span className="text-gray-600">{room.ratings.length} đánh giá</span>)
                            </div>
                          </div>

                          <div className="font-semibold">
                            <div className="text-[#ff6400]">2 giờ đầu</div>
                            <div className="text-sm text-end">
                              {formatCurrency(room.price[room.price.length - 1].value * 2)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="content-right h-[100vh] overflow-hidden w-[39.7%] mbs:w-[100%] mb:w-[39.7%]">
              <iframe
                className="h-[100%]"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.863981044336!2d105.7445984148835!3d21.038127785993215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313454b991d80fd5%3A0x53cefc99d6b0bf6f!2sFPT%20Polytechnic%20Hanoi!5e0!3m2!1sen!2s!4v1665651057540!5m2!1sen!2s"
                width={600}
                height={450}
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchResult;
