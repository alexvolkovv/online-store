import React, {useState} from 'react';
import styles from './DataInfo.module.css'
import {observer} from "mobx-react-lite";
import arrow from '../../../assets/img/arrowDown.png'

const DataInfo = observer((props) => {
  const {data, columnNames, rowClick, sort, deletingColumns = []} = props
  const [sorting, setSorting] = useState('')
  const [asc, setAsc] = useState(true)

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {Object.keys(data[0] || {}).map((info, index) => {
            if (!deletingColumns.includes(info)) {
              return <td
                key={info}
                onClick={() => {
                  if (info === sorting) {
                    setAsc(!asc)
                    sort(info, !asc)
                  } else {
                    setAsc(true)
                    sort(info, true)
                  }

                  setSorting(info)
                }}
                className={[styles.headElement, sorting === info && styles.active].join(' ')}
              >
                {columnNames ? columnNames.find(name => name.oldName === info).newName : info} {sorting === info && <span>
            <img width={10} src={arrow} alt="arrow" style={{
              transform: `rotate(${asc ? 180 : 0}deg)`,
              transition: '0.2s all'
            }
            }/>
            </span>}
              </td>
            } else {
              return null
            }
          })}
        </tr>
      </thead>
      {data.map(dataInfo => (
        <tr key={dataInfo.id} className={styles.row} onClick={() => rowClick(dataInfo)}>
          {Object.values(dataInfo).map((value, index) => {
              if (!deletingColumns.includes(Object.keys(dataInfo)[index])) {
                return <td className={styles.element}>
                  {!Number(value) && Date.parse(value) ? value.slice(0, 10) : value}
                </td>
              }
              return null
              }
            )}
        </tr>
      ))}
    </table>
  );
});

export default DataInfo;