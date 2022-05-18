import axios from "axios";
import {PATH_HOST} from "../utils/Paths";

class PdfAPI {
  async getFinancialPDF(year) {
    const response = await axios.get(PATH_HOST + `/api/pdf/financial/${year}`, { responseType: 'blob' })

    return response
  }
}

export default new PdfAPI()