export default function universalSort(param, dataFromStore, setNewData, asc = true) {
  if (asc) {
    if (Number(dataFromStore[0][param])) {
      setNewData([...dataFromStore].sort((a, b) => (
        a[param] - b[param]
      )))
    } else if (Date.parse(dataFromStore[0][param])) {
      setNewData([...dataFromStore].sort((a, b) => (
        new Date(a[param]) - new Date(b[param])
      )))
    }
    else {
      setNewData([...dataFromStore].sort((a, b) => (
        a[param].localeCompare(b[param])
      )))
    }
  } else {
    if (Number(dataFromStore[0][param])) {
      setNewData([...dataFromStore].sort((a, b) => (
        b[param] - a[param]
      )))
    } else if (Date.parse(dataFromStore[0][param])) {
      setNewData([...dataFromStore].sort((a, b) => (
        new Date(b[param]) - new Date(a[param])
      )))
    }
    else {
      setNewData([...dataFromStore].sort((a, b) => (
        b[param].localeCompare(a[param])
      )))
    }
  }
}