import { CustomerData } from "../../../models/CustomerData";
import { getBillStatus } from "../../../utils/utils";

export function desc(a: any, b: any, orderBy: any) {
  let compA = a[orderBy];
  let compB = b[orderBy];
  if (orderBy === "status") {
    compA = getBillStatus(a.status)?.weight;
    compB = getBillStatus(b.status)?.weight;
  }
  if (compB < compA) {
    return -1;
  }
  if (compB > compA) {
    return 1;
  }
  return 0;
}

export function stableSort(array: any[], cmp: (a: any, b: any) => number, customers: CustomerData[]) {
  const stabilizedThis = array.map((el: any, index) => [
    {
      id: el.id,
      client: customers ? customers.find(customer => customer.id === el.clientId)?.name : "",
      status: el.status,
      createdBy: el.createdBy,
      updatedAt: el.updatedAt ? el.updatedAt : "",
      createdAt: el.createdAt
    },
    index
  ]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return (a[1] as number) - (b[1] as number);
  });
  return stabilizedThis.map((el: any) => el[0]);
}

export function getSorting(order: TableOrder, orderBy: any): (a: { [key in any]: number | string }, b: { [key in any]: number | string }) => number {
  return order === "desc" ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

export type TableOrder = "asc" | "desc";
