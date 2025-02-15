import { CommentType } from "../types/comment";
import instance from "./instance";


export const create = (comment: CommentType): Promise<CommentType> => {
    const url = 'comments';
    return instance.post(url, comment);
}

export const get = (roomId: string) => {
    const url = `comments/${roomId}`;
    return instance.get(url);
}

export const remove = (commentId: string): Promise<CommentType> => {
    const url = `comment/${commentId}/delete`;
    return instance.delete(url)
}