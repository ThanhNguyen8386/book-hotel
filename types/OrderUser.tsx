export type OrderUser = {
    _id?: number,
    name: string,
    phone: number,
    email: string,
    statusorder: string,
    total: number,
    checkins: string,
    checkouts: string,
    room: {
      coc: boolean,
      _id: number,
      name:string,
      slug: string,
      image: [],
      price: number,
      description: string,
      category: string,
      basic: string,
}

}