import { DataTable } from "react-native-paper";


export default function DataTableCell() {
  return (
    <DataTable.Row style={{ backgroundColor: "#2b87b022" }}>
      <DataTable.Cell numeric>1</DataTable.Cell>
      <DataTable.Cell numeric>2</DataTable.Cell>
      <DataTable.Cell numeric>3</DataTable.Cell>
      <DataTable.Cell numeric>4</DataTable.Cell>
    </DataTable.Row>
  );
}
