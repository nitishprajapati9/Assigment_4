export interface ProductType{
    id:number,
    title:string,
    description:string,
    category:string,
    price:number,
    discountPercentage:number,
    rating:number,
    stock:number,
    tags:string[],
    brand:string,
    sku:string,
    warrantyInformation:string,
    shippingInformation:string,
    availablityStatus:string,
    reviews:Reviews[],
    returnPolicy:string,
    miniOrderQuantity:number,
    meta:Meta,
    images:string[],
    thumbnail:string
}

export interface Reviews{
    rating:number,
    comment:string,
    date:string,
    reviewerName:string,
    reviewerEmail:string
}

export interface Meta{
    createdAt:string,
    updatedAt:string,
    barcode:string,
    qrCode:string
}