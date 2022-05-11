import {makeAutoObservable} from "mobx";
import CharacteristicsAPI from "../API/CharacteristicsAPI";

class CharacteristicsStore {
  constructor() {
    this._characteristics = []
    this._changingCharacteristic = null
    makeAutoObservable(this)
  }

  get characteristics() {
    return this._characteristics
  }

  setCharacteristics(characteristics) {
    this._characteristics = characteristics
  }

  get changingCharacteristic() {
    return this._changingCharacteristic
  }

  setChangingCharacteristic(characteristic) {
    this._changingCharacteristic = characteristic
  }

  fetchCharacteristics() {
    CharacteristicsAPI.get().then(data => {
      this.setCharacteristics(data)
    })
  }
}

export default new CharacteristicsStore()