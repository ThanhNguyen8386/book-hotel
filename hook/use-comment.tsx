import axios from "axios";
import useSWR from "swr";
import { create, remove } from "../api/comment";
import { API_URL } from "../constants";
import { CommentType } from "../types/comment";

const useComment = (roomId?: string) => {
    
    const fetcher = (args: string) => axios.get(args).then(res => res.data)
    const { data, error, mutate } = useSWR(roomId ? `${API_URL}/comments/${roomId}` : `${API_URL}/comments`, fetcher);

    // create
    const addComment = async (commentData: CommentType) => {
        const comment = await create(commentData);
        const currentUser = JSON.parse(localStorage.getItem("user") as string);
        comment.user = currentUser;
        mutate([comment, ...data]);
    };

    const removeComment = async (commentId: string) => {
        const comment = await remove(commentId);
        const newComments = data.filter((cmt: CommentType) => cmt._id !== comment._id);
        mutate(newComments);
    }

    return {
        addComment,
        removeComment,
        data,
        error
    };
};

export default useComment;
