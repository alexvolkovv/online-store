import axios from "axios";
import {PATH_HOST} from "../utils/Paths";

class StockAPI {
  async get() {
    const response = await axios.get(PATH_HOST + '/api/stock')

    return response.data
  }

  async create(stock) {
    const response = await axios.post(PATH_HOST + '/api/stock', stock)

    return response.data
  }

  async delete(stockId) {
    const response = await axios.delete(PATH_HOST + '/api/stock/' + stockId)

    return response.data
  }

  async change(stock) {
    const response = await axios.put(PATH_HOST + '/api/stock/', stock)

    return response.data
  }

}

export default new StockAPI()