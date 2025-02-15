export type DetailOrderType = {
    order: {
      _id?:number
        name: string,
        phone: number,
        email: number,
        ckeckins: string,
        checkouts:string,
        statusorder:number,
        total:number,
        status:string,
        user:string
      },
      room: [
        {
          _id?:string|undefined ,
          name: string,
          slug: string,
          image: string,
          price: number,
          description: string,
          category: string,
          createdAt: string,
          basic: string
        }
      ],
      "basic": []
}