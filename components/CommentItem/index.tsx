import dayjs from "dayjs";
import { UserType } from "../../types/user";
import "sweetalert2/dist/sweetalert2.css";
import Swal from "sweetalert2";
import { ADMIN_ROLE } from "../../constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as starRegular } from "@fortawesome/free-regular-svg-icons";
import { Avatar } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

/* eslint-disable @next/next/no-img-element */
type CommentItemProps = {
  comment: {
    user: UserType;
    createdAt: Date;
    comment: string;
    _id: string;
    star: string;
    room: any
  };
  isLogged: boolean;
  currentUser?: UserType;
  onRemoveCmt: (cmtId: string) => Promise<void>;
};

const CommentItem = ({ comment, isLogged, currentUser, onRemoveCmt }: CommentItemProps) => {
  const handleRemoveComment = (commentId: string) => {
    Swal.fire({
      title: 'Bạn có chắc chắn muốn xóa?',
      text: "Không thể hoàn tác sau khi xóa!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await onRemoveCmt(commentId);
        Swal.fire(
          'Thành công!',
          'Đã xóa bình luận.',
          'success'
        )
      }
    })
  }

  const renderStar = (star: number) => {
    return (
      <>
        {Array.apply(null, new Array(star)).map((_, index) => (
          <span className="text-[#ff6400] text-xs" key={index}>
            <FontAwesomeIcon icon={faStar} />
            {/* <StarIcon /> */}
          </span>
        ))}

        {Array.apply(null, new Array(5 - star)).map((_, index) => (
          <span className="text-gray-400 text-xs" key={index}>
            <FontAwesomeIcon icon={starRegular} />
          </span>
        ))}
      </>
    )
  }
  return (
    <>
      <div className='relative group'>
        <div className="">
          <div className="flex items-center my-2">
            <div className='mr-3'>
              <Avatar
                alt="Remy Sharp"
                src={`${comment.user?.avatar}`}
                sx={{ width: 56, height: 56 }}
              />
            </div>
            <div className='flex-1'>
              <p className='font-semibold'>{comment.user?.name}</p>
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <span className='text-[#636366]'>{dayjs(comment.createdAt).format("DD/MM/YYYY")} · {renderStar(+comment.star)} </span>
            <span className="">Phòng: {comment.room.name}</span>
          </div>
        </div>
        <div className="">
          <p>{comment.comment}</p>
        </div>

        {/* admin có thể xóa bất kỳ cmt, user có thể xóa cmt của chính mình. */}
        {isLogged && (currentUser?.role === ADMIN_ROLE || currentUser?._id === comment.user?._id) && (
          <button
            onClick={() => handleRemoveComment(comment._id)}
            className="absolute top-0 right-0 hidden transition group-hover:block p-2 border text-sm transition hover:text-white hover:bg-[#FFA500] hover:border-[#FFA500]"
          >
            Xóa
          </button>
        )}
      </div>
    </>
  )
}

export default CommentItem