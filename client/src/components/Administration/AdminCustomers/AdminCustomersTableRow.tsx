import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { TableRow, TableCell, IconButton, Theme } from "@material-ui/core";
import { blue, red } from "@material-ui/core/colors";
import routes from "../../../routes";
import { useHistory } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import ClearIcon from "@material-ui/icons/Clear";
import ConfirmDialog from "../../ConfirmDialog";
import { MESSAGES } from "../../../constants";
import { makeStyles } from "@material-ui/styles";
import { useCustomersContext } from "../../../providers/CustomerProvider";

const AdminCustomersTableRow: React.FC<any> = ({ customer }) => {
  const history = useHistory();
  const classes = useStyles();
  const customerContext = useCustomersContext();
  const [openDialog, setOpenDialog] = useState(false);

  const goToCustomer = (id: number) => {
    history.push(routes.CUSTOMERS_DETAIL.path.replace(":id", id.toString()));
  };

  const editCustomer = (event: any, id: number) => {
    event.stopPropagation();
    history.push(routes.CUSTOMERS_UPDATE.path.replace(":id", id.toString()));
  };

  const deleteCustomer = () => {
    customerContext.deleteCustomer(customer.id);
  };

  const toggleDialog = (event: React.MouseEvent) => {
    event.stopPropagation();
    setOpenDialog(true);
  };

  return (
    <>
      <TableRow hover onClick={e => goToCustomer(customer.id)} key={customer.id}>
        <TableCell component="th" scope="row">
          {customer.name}
        </TableCell>
        <TableCell>{customer.contact}</TableCell>
        <TableCell>{customer.phone}</TableCell>
        <TableCell>{customer.email}</TableCell>
        <TableCell align="right">
          <IconButton className={classes.editButton} onClick={e => editCustomer(e, customer.id)}>
            <EditIcon />
          </IconButton>
          <IconButton className={classes.deleteButton} onClick={toggleDialog}>
            <ClearIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      {openDialog && (
        <ConfirmDialog text={MESSAGES.CONFIRM_DELETE_CUSTOMER} open={openDialog} closeModal={(e: any) => setOpenDialog(false)} onConfirm={deleteCustomer} onCancel={(e: any) => setOpenDialog(false)} />
      )}
    </>
  );
};

AdminCustomersTableRow.propTypes = {
  customer: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

const useStyles = makeStyles((theme: Theme) => ({
  editButton: {
    color: blue[500]
  },
  deleteButton: {
    color: red[700]
  }
}));

export default AdminCustomersTableRow;
