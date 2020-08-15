import React, { forwardRef } from 'react';
import { AddBox, Check, Clear, Delete } from '@material-ui/icons';
import MaterialTable from 'material-table';

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <Delete {...props} ref={ref} />),
};

export const CrudTable = (props) => {
  return (
    <MaterialTable
      icons={tableIcons}
      options={{
        actionsColumnIndex: -1,
      }}
      {...props}
    />
  );
};
