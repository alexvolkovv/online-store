import axios from "axios";
import {PATH_HOST} from "../utils/Paths";

class SupplierAPI {
  async get() {
    const response = await axios.get(PATH_HOST + '/api/supplier')

    return response.data
  }

  async create(supplier) {
    const response = await axios.post(PATH_HOST + '/api/supplier', supplier)

    return response.data
  }

  async delete(supplierId) {
    console.log(supplierId)
    const response = await axios.delete(PATH_HOST + '/api/supplier/' + supplierId)

    return response.data
  }
  //
  async change(supplier) {
    const response = await axios.put(PATH_HOST + '/api/supplier', supplier)

    return response.data
  }

}

export default new SupplierAPI()