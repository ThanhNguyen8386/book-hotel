import { RoomType } from "./room";
import { UserType } from "./user";

export type CommentType = {
  _id?: string;
  comment: string;
  user: UserType | string;
  createdAt?: Date;
  room: string;
  star: string;
}

export type CommentType2 = {
  _id: string;
  user: UserType;
  room: RoomType;
}