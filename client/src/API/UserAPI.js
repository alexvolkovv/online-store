import axios from "axios";
import {PATH_HOST} from "../utils/Paths";

class UserAPI {
  async login(email, password) {
    const response = await axios.post(PATH_HOST + '/api/client/login', {
      email,
      password
    })

    return response.data
  }

  async registration(email, password, role) {
    const response = await axios.post(PATH_HOST + '/api/client/registration', {
      email,
      password,
      role
    })

    return response.data
  }

  async getAll(id) {
    const response = await axios.get(PATH_HOST + '/api/client/' + id)

    return response.data
  }

  async changeRole(id, newRole) {
    const response = await axios.put(PATH_HOST + '/api/client/' + id, {
      newRole
    })

    return response.data
  }
}

export default new UserAPI()