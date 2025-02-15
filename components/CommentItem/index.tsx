import dayjs from "dayjs";
import { UserType } from "../../types/user";
import "sweetalert2/dist/sweetalert2.css";
import Swal from "sweetalert2";
import { ADMIN_ROLE } from "../../constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as starRegular } from "@fortawesome/free-regular-svg-icons";

/* eslint-disable @next/next/no-img-element */
type CommentItemProps = {
  comment: {
    user: UserType;
    createdAt: Date;
    comment: string;
    _id: string;
    star: string;
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
          <div className="text-[#ff6400]" key={index}>
            <FontAwesomeIcon icon={faStar} />
          </div>
        ))}

        {Array.apply(null, new Array(5 - star)).map((_, index) => (
          <div className="text-gray-400" key={index}>
            <FontAwesomeIcon icon={starRegular} />
          </div>
        ))}
      </>
    )
  }

  return (
    <div className='flex items-center my-3'>
      <div className="flex-1">
        <div className="flex items-center">
          <div className='mr-3'>
            <img src={`${comment.user?.avatar}`} className='w-[60px] h-[60px] object-cover rounded-full flex-1' alt="" />
          </div>
          <div className='flex-1'>
            <span className='text-[#636366]'>{dayjs(comment.createdAt).format("DD/MM/YYYY")}</span>
            <div>
              Khách hàng: <strong className='text-lg'>{comment.user?.name}</strong>
            </div>

            <div className="flex">
              <span className="mr-1">Đánh giá:</span> {renderStar(+comment.star)}
            </div>
          </div>
        </div>

        <div className="mt-2">{comment.comment}</div>
      </div>

      {/* admin có thể xóa bất kỳ cmt, user có thể xóa cmt của chính mình. */}
      {isLogged && (currentUser?.role === ADMIN_ROLE || currentUser?._id === comment.user?._id) && (
        <button onClick={() => handleRemoveComment(comment._id)} className="p-2 border text-sm transition hover:text-white hover:bg-[#FFA500] hover:border-[#FFA500]">
          Xóa
        </button>
      )}
    </div>
  )
}

export default CommentItem