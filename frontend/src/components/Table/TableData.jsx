import DataTable from "react-data-table-component";
import "./TableData.css";

function TableData({ columns, data }) {
  return (
    <DataTable
      columns={columns}
      data={data}
      pagination
      fixedHeader
      fixedHeaderScrollHeight="800px"
      //   selectableRows
    ></DataTable>
  );
}

export default TableData;
