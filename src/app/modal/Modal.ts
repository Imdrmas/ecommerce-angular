export interface User {
    id: number,
    username: string,
    password: string,
    active: boolean,
    address: string,
    admin: boolean,
    cardNumber: string,
    city: string,
    cvv: any,
    email: string,
    expMonth: string,
    expYear: string,
    nameOnCard: string
}

export interface Category {
    id: number,
    name: string
}
export interface Comment {
    id: number,
    addedAt: any,
    addedBy: string,
    message: string,
    title: string
}
export interface ReplayComment {
    id: number,
    addedAt: any,
    addedBy: string,
    messageReplay: string
}
export interface Order {
    id: number,
    dateCreated: any,
    status: any
}
export interface OrderProduct {
    quantity: number
}
export interface Product {
    id: number,
    description: string,
    name: string,
    pictureUrl: string,
    price: number
}
export interface Tag {
    id: number,
    name: string
}