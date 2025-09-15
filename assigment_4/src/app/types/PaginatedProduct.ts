export interface PaginatedProduct{
    limit:number,
    products:Products[],
    total:number,
    skip:number,
    hasMore:boolean
}

export interface Products{
    category:string;
    id:number;
    title:string;
    description:string;
    discountPercentage:number;
    rating:number;
    thumbnail:string,
    price:number
    tags:string[]
}

