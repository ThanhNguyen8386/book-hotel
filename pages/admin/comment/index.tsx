import Head from 'next/head'
import React, { useEffect, useMemo, useState } from 'react'
import { DashboardLayout } from '../../../components/dashboard-layout'
import {
  DataGrid,
  GridActionsCellItem,
  GridColumns,
} from '@mui/x-data-grid';
import MenuIcon from '@mui/icons-material/Menu';
import { Tooltip } from '@mui/material';
import Dialog from "@mui/material/Dialog";
import useComment from '../../../hook/use-comment';
import { CommentType, CommentType2 } from '../../../types/comment';
import CommentItem from '../../../components/CommentItem';
import { UserType } from '../../../types/user';

type Row = {
  id: string;
  ["Room Name"]: string;
  ["Total Comment"]: number;
  comments: CommentType[];
};

type Props = {}

const CommentManagement = (props: Props) => {
  const { data, removeComment } = useComment();
  const [rows, setRows] = useState<Row[]>([]);
  const [comments, setComments] = useState<CommentType[]>([]);
  // id room của danh sách comment hiện tại
  const [currentRoomId, setCurrentRoomId] = useState<string>()
  const [openDialogComment, setOpenDialogComment] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserType>();

  useEffect(() => {
    convertData(data);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  useEffect(() => {
    const getUser = JSON.parse(localStorage.getItem("user") as string || "{}");
    setCurrentUser(getUser);
}, []);

  const columns = useMemo<GridColumns<Row>>(
    () => [
      { field: 'Room Name', type: 'string', width: 450 },
      { field: 'Total Comment', type: 'number', width: 200 },
      {
        field: 'actions',
        type: 'actions',
        width: 300,
        getActions: (params) => [
          <GridActionsCellItem
            key={1}
            icon={
              <Tooltip title="List Comment">
                <MenuIcon />
              </Tooltip>
            }
            label="List Comment"
            onClick={() => {
              handleOpenDialogCmt(params.row.comments, params.row.id);
            }}
          />
        ],
      },
    ],
    [],
  );

  // convert list comment to room with comment
  const convertData = (comments: CommentType2[]) => {
    const result: {
      id: string;
      ["Room Name"]: string;
      ["Total Comment"]: number;
      comments: CommentType[]
    }[] = [];

    comments?.forEach(cmt => {
      const roomId = cmt.room?._id;
      const isRoomExits = result.some(item => item.id === roomId);

      if (!isRoomExits) {
        const commentsByRoom = data.filter((item: CommentType2) => item.room._id === roomId);

        result.push({
          id: roomId,
          ["Room Name"]: cmt.room.name,
          ["Total Comment"]: commentsByRoom.length,
          comments: commentsByRoom
        })
      }
    });

    setRows(result);

    if (currentRoomId) {
      const commentByRoom = result.find(item => item.id === currentRoomId)?.comments;
      setComments(commentByRoom!);
    }
  }

  // toggle dialog comment list
  const handleToggleDialogComment = () => setOpenDialogComment(!openDialogComment);

  // open dialog comment
  const handleOpenDialogCmt = (comments: CommentType[], roomId: string) => {
    setOpenDialogComment(true);
    setComments(comments);
    setCurrentRoomId(roomId);
  }

  return (
    <>
      <Head>
        <title>Comment Management</title>
      </Head>

      <main className='p-3 w-full h-[calc(100vh-64px)]'>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </main>

      {/* dialog list comment */}
      <Dialog
        open={openDialogComment}
        onClose={() => handleToggleDialogComment()}
        fullWidth
        maxWidth="lg"
      >
        <div className='px-6 py-4'>
          <button className='block ml-auto' onClick={() => handleToggleDialogComment()}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className='w-6 h-6'>
              <path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z" />
            </svg>
          </button>

          <div className='font-bold flex items-end'>
            <h2 className='text-[35px]'>Đánh giá</h2>
            <div className='text-lg pb-1.5'>
              &ensp;•&ensp;
              {comments?.length} Đánh giá
            </div>
          </div>

          {/* list comment */}
          <div className='grid grid-cols-3 gap-5 my-3'>
            {comments?.map((cmt: CommentType) => {
              return <CommentItem
                key={cmt._id}
                comment={cmt as any}
                isLogged={true}
                currentUser={currentUser}
                onRemoveCmt={removeComment}
              />
            })}
          </div>
        </div>
      </Dialog>
    </>
  )
}

CommentManagement.Layout = DashboardLayout;
export default CommentManagement