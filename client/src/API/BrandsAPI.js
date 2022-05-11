import axios from "axios";
import {PATH_HOST} from "../utils/Paths";

class BrandsAPI {
  async get() {
    const response = await axios.get(PATH_HOST + '/api/brand')

    return response.data
  }

  async create(newBrand) {
    const response = await axios.post(PATH_HOST + '/api/brand', newBrand)

    return response.data
  }

  async change(newBrand) {
    const response = await axios.patch(PATH_HOST + '/api/brand', newBrand)

    return response.data
  }

  async delete(brandId) {
    const response = await axios.delete(PATH_HOST + '/api/brand/' + brandId)

    return response.data
  }
}

export default new BrandsAPI()