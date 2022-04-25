import axios from "axios";
import {PATH_HOST} from "../utils/Paths";

class CategoriesAPI {
  async get() {
    const response = await axios.get(PATH_HOST + '/api/category')

    return response.data
  }
}

export default new CategoriesAPI()