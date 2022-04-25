import axios from "axios";
import {PATH_HOST} from "../utils/Paths";

class BrandsAPI {
  async get() {
    const response = await axios.get(PATH_HOST + '/api/brand')

    return response.data
  }

}

export default new BrandsAPI()