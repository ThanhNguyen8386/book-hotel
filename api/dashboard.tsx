import instance from "./instance";

export const getRevenue = (data: any) => {
    const url = `/revenue`;
    return instance.post(url, data)
}

export const getRevenueByMonth = () => {
    return instance.post('/revenueByMonth')
}

export const getRevenueByRoom = (user: any) => {
    return instance.post('/revenueByRoom', user)
}

export const getRoomRevenue = (user: any) => {
    return instance.post('/getRoomRevenue', user)
}
export const getOftenCancels = (user: any) => {
    return instance.post('/usersOftenCancel', user)
}
export const getMostUserRevenues = (user: any) => {
    return instance.post('/mostUserRevenues', user)
}


