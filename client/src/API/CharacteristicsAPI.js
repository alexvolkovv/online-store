import axios from "axios";
import {PATH_HOST} from "../utils/Paths";

class CharacteristicsAPI {
  async get() {
    const response = await axios.get(PATH_HOST + '/api/characteristics')

    return response.data
  }

  async delete(id) {
    const response = await axios.delete(PATH_HOST + '/api/characteristics/' + id)

    return response.data
  }

  async create(newData) {
    const response = await axios.post(PATH_HOST + '/api/characteristics/', newData)

    return response.data
  }

  async change(newData) {
    const response = await axios.put(PATH_HOST + '/api/characteristics/', newData)

    return response.data
  }

}

export default new CharacteristicsAPI()