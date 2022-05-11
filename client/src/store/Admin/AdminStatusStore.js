import {makeAutoObservable} from "mobx";
import StatusesAPI from "../../API/StatusesAPI";

class AdminStatusStore {
  constructor(props) {
    this._statuses = []
    this._selectedStatus = null
    makeAutoObservable(this)
  }

  get statuses() {
    return this._statuses
  }

  setStatuses(statuses) {
    this._statuses = statuses
  }

  get selectedStatus() {
    return this._selectedStatus
  }

  setSelectedStatus(status) {
    this._selectedStatus = status
  }

  fetchStatuses() {
    StatusesAPI.get().then(statuses => {
      this._statuses = statuses
    })
  }
}

export default new AdminStatusStore()