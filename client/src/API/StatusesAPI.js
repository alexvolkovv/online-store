import axios from "axios";
import {PATH_HOST} from "../utils/Paths";

class StatusesAPI {
  async get() {
    const response = await axios.get(PATH_HOST + '/api/status')

    return response.data
  }

}

export default new StatusesAPI()