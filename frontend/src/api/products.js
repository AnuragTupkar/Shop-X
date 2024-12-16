export const  products = async() =>{ const response =await fetch('https://fakestoreapi.com/products')
    return response.json()
}