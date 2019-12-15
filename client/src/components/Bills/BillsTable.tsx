import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import BillStatusIcon from "./BillStatusIcon";
import { useHistory } from "react-router-dom";
import routes from "../../routes";
import { BillData } from "../../models/BillData";
import moment from "moment";

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
  const { bills } = props;
  const classes = useStyles();
  const history = useHistory();

  const goToBill = (id: number) => {
    history.push(routes.BILLS_DETAIL.path.replace(":id", id.toString()));
  };

  return (
    <Paper className={classes.root}>
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
          {bills.map((row: BillData) => (
            <TableRow onClick={e => goToBill(row.id as number)} hover key={row.id}>
              <TableCell component="th" scope="row">
                <BillStatusIcon status={row.status} />
              </TableCell>
              <TableCell>{row.clientId}</TableCell>
              <TableCell>{row.createdBy}</TableCell>
              <TableCell>{moment(row.createdAt).fromNow()}</TableCell>
              <TableCell>{row.updatedAt ? moment(row.updatedAt).fromNow() : "Jamais"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default BillsTable;
