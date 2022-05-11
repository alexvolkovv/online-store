import React from 'react';
import {observer} from "mobx-react-lite";
import universalSort from "../../../utils/universalSort";
import DataInfo from "../DataInfo/DataInfo";
import AdminStatusStore from "../../../store/Admin/AdminStatusStore";

const AdminStatuses = observer(() => {

  function sort(param, asc) {
    universalSort(param, AdminStatusStore.statuses, AdminStatusStore.setStatuses.bind(AdminStatusStore), asc)
  }
  return (
    <div style={{width: '100%'}}>


      <DataInfo
        data={AdminStatusStore.statuses}
        // rowClick={rowClick}
        sort={sort}
        deletingColumns={[

        ]}
      />
    </div>
  );
});

export default AdminStatuses;