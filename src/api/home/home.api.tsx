import axios from 'axios'
import { Header } from '../config.api'

const GetProduct = async (page: any) => {
    try {
        const response = await axios.get(
            `http://api.elevenia.co.id/rest/prodservices/product/listing?page=${page}`,
            await Header()
        )
        return response.data
    } catch (error) {
        return error
    }
}

const GetProductDetail = async (number: any) => {
    try {
        const response = await axios.get(
            `http://api.elevenia.co.id/rest/prodservices/product/details/${number}`,
            await Header()
        )
        return response.data
    } catch (error) {
        return error
    }
}

export default {
    GetProduct,
    GetProductDetail
}