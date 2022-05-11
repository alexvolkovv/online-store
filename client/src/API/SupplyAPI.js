import axios from "axios";
import {PATH_HOST} from "../utils/Paths";

class SupplierAPI {
  async getAll() {
    const response = await axios.get(PATH_HOST + '/api/supply')

    return response.data
  }

  async getOne(supplyId) {
    const response = await axios.get(PATH_HOST + '/api/supply/' + supplyId)

    return response.data
  }

  async create(supply) {
    const response = await axios.post(PATH_HOST + '/api/supply', supply)

    return response.data
  }

  async delete(supplyId) {
    const response = await axios.delete(PATH_HOST + '/api/supply/' + supplyId)

    return response.data
  }

  async change(supply) {
    const response = await axios.put(PATH_HOST + '/api/supply', supply)

    return response.data
  }

}

export default new SupplierAPI()