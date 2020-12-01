import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import { TableOrder, stableSort, getSorting } from "./BillOrQuoteTableEnhancedUtils";
import { GenericBillOrQuoteData } from "../../../models/GenericBillOrQuoteData";
import BillStatusIcon from "../../Bills/BillStatusIcon";
import useCustomers from "../../../hooks/useCustomers";
import { Skeleton } from "@material-ui/lab";
import { TableHeadCell } from "../SortingTable/SortingTable";

const headCells: TableHeadCell[] = [
  { id: "status", numeric: false, disablePadding: false, label: "Status" },
  { id: "client", numeric: false, disablePadding: false, label: "Client" },
  { id: "createdBy", numeric: false, disablePadding: false, label: "Créée par" },
  { id: "createdAt", numeric: false, disablePadding: false, label: "Créée le" },
  { id: "updatedAt", numeric: false, disablePadding: false, label: "Mise à jour le" }
];

interface BillOrQuoteTableEnhancedHeadProps {
  classes: ReturnType<typeof useStyles>;
  onRequestSort: (event: React.MouseEvent, property: any) => void;
  order: TableOrder;
  orderBy: string;
  rowCount: number;
  headCells: TableHeadCell[];
}

function BillOrQuoteTableEnhancedHead(props: BillOrQuoteTableEnhancedHeadProps) {
  const { classes, order, orderBy, onRequestSort, headCells } = props;
  const createSortHandler = (property: any) => (event: React.MouseEvent) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map(headCell => (
          <TableCell key={headCell.id} align={headCell.numeric ? "right" : "left"} padding={headCell.disablePadding ? "none" : "default"} sortDirection={orderBy === headCell.id ? order : false}>
            <TableSortLabel active={orderBy === headCell.id} direction={order} onClick={createSortHandler(headCell.id)}>
              {headCell.label}
              {orderBy === headCell.id ? <span className={classes.visuallyHidden}>{order === "desc" ? "Tri par ordre décroissant" : "Tri par ordre croissant"}</span> : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1
  }
}));

type BillOrQuoteTableEnhancedProps = {
  rows: GenericBillOrQuoteData[];
  isLoading?: boolean;
  handleRowClick: Function;
};

export const BillOrQuoteTableEnhanced: React.FC<BillOrQuoteTableEnhancedProps> = ({ rows, isLoading = false, handleRowClick }) => {
  const classes = useStyles();
  const [order, setOrder] = React.useState<TableOrder>("desc");
  const [orderBy, setOrderBy] = React.useState<string>("id");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const { customers } = useCustomers();

  const handleRequestSort = (event: React.MouseEvent, property: any) => {
    const isDesc = orderBy === property && order === "desc";
    setOrder(isDesc ? "asc" : "desc");
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      <Table aria-labelledby="sortedTable" aria-label="sorted-table">
        <BillOrQuoteTableEnhancedHead classes={classes} order={order} orderBy={orderBy} onRequestSort={handleRequestSort} rowCount={rows ? rows.length : 0} headCells={headCells} />
        <TableBody>
          {rows && !isLoading ? (
            stableSort(rows, getSorting(order, orderBy), customers)
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row: any, index: number) => (
                <TableRow hover onClick={event => handleRowClick(event, row.id ? row.id.toString() : "")} tabIndex={-1} key={row.id}>
                  <TableCell component="th" scope="row">
                    <BillStatusIcon status={row.status} />
                  </TableCell>
                  <TableCell>{row.client ? row.client : <Skeleton width={100} />}</TableCell>
                  <TableCell>{row.createdBy}</TableCell>
                  <TableCell>{row.createdAt?.fromNow()}</TableCell>
                  <TableCell>{row.updatedAt ? row.updatedAt.fromNow() : "Jamais"}</TableCell>
                </TableRow>
              ))
          ) : (
            <TableRow>
              <TableCell>
                <Skeleton />
              </TableCell>
              <TableCell>
                <Skeleton />
              </TableCell>
              <TableCell>
                <Skeleton />
              </TableCell>
              <TableCell>
                <Skeleton />
              </TableCell>
              <TableCell>
                <Skeleton />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {rows && rows.length > 25 && (
        <TablePagination
          rowsPerPageOptions={[25, 50, 75, 100]}
          component="div"
          count={rows ? rows.length : 0}
          rowsPerPage={rowsPerPage}
          page={page}
          labelDisplayedRows={info => info.from + " - " + info.to + " sur " + info.count}
          labelRowsPerPage="Lignes par page"
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      )}
    </div>
  );
};
