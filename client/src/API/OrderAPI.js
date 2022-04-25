import axios from "axios";
import {PATH_HOST} from "../utils/Paths";

class OrderAPI {
  async getOne(id) {
    const response = await axios.get(PATH_HOST + '/api/order/' + id)

    return response.data
  }
}

export default new OrderAPI()