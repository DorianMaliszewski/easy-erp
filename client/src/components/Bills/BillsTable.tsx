import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import BillStatusIcon from "./BillStatusIcon";
import { useHistory } from "react-router-dom";
import routes from "../../routes";
import { BillData } from "../../models/BillData";
import useCustomers from "../../hooks/useCustomers";
import { Skeleton } from "@material-ui/lab";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(2),
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  }
}));

const BillsTable: React.FC<any> = props => {
  const { bills, isLoading } = props;
  const classes = useStyles();
  const history = useHistory();
  const { customers } = useCustomers();

  const goToBill = (id: number) => {
    history.push(routes.BILLS_DETAIL.path.replace(":id", id.toString()));
  };

  return (
    <Table className={classes.table}>
      <TableHead>
        <TableRow>
          <TableCell>Status</TableCell>
          <TableCell>Client</TableCell>
          <TableCell>Crée par</TableCell>
          <TableCell>Crée le</TableCell>
          <TableCell>Mise à jour le</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {!isLoading && bills ? (
          bills.map((row: BillData) => (
            <TableRow onClick={e => goToBill(row.id as number)} hover key={row.id}>
              <TableCell component="th" scope="row">
                <BillStatusIcon status={row.status} />
              </TableCell>
              <TableCell>{customers ? customers.find(customer => customer.id === row.clientId)?.name : <Skeleton width={100} />}</TableCell>
              <TableCell>{row.createdBy}</TableCell>
              <TableCell>{row.createdAt?.fromNow()}</TableCell>
              <TableCell>{row.updatedAt ? row.updatedAt.fromNow() : "Jamais"}</TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell component="th" scope="row">
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
  );
};

export default BillsTable;
