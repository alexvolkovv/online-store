import axios from "axios";
import {PATH_HOST} from "../utils/Paths";

class CategoriesAPI {
  async get() {
    const response = await axios.get(PATH_HOST + '/api/category')

    return response.data
  }

  async change(newData) {
    const response = await axios.put(PATH_HOST + '/api/category', newData)

    return response.data
  }

  async create(newData) {
    console.log('запрос на сервак')
    const response = await axios.post(PATH_HOST + '/api/category', newData)

    console.log('запрос на сервак 2')

    return response.data
  }

  async delete(categoryId) {
    const response = await axios.delete(PATH_HOST + '/api/category/' + categoryId)

    return response.data
  }
}

export default new CategoriesAPI()