import { facilities } from "./fac";

export type RoomType = {
  data: {
    _id: string;
    name: string;
    slug: string;
    image: string[];
    price: { value: number }[];
    ratings: [];
    ratingAvg: string;
    listFacility: facilities[];
  }
};
