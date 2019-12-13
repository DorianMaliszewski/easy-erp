import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { TableRow, TableCell, withStyles, IconButton } from "@material-ui/core";
import { blue, red } from "@material-ui/core/colors";
import routes from "../../../routes";
import { withRouter } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import ClearIcon from "@material-ui/icons/Clear";
import CustomerContext from "../../../contexts/CustomerContext";
import ConfirmDialog from "../../ConfirmDialog";
import { MESSAGES } from "../../../constants";

const AdminCustomersTableRow = ({ customer, history, classes }) => {
  const customerContext = useContext(CustomerContext);
  const [openDialog, setOpenDialog] = useState(false);

  const goToCustomer = id => {
    history.push(routes.CUSTOMERS_DETAIL.path.replace(":id", id));
  };

  const editCustomer = (event, id) => {
    event.stopPropagation();
    history.push(routes.CUSTOMERS_FORM.path.replace(":id", id));
  };

  const deleteCustomer = () => {
    customerContext.deleteCustomer(customer.id);
  };

  const toggleDialog = event => {
    event.stopPropagation();
    setOpenDialog(true);
  };

  return (
    <>
      <TableRow hover onClick={e => goToCustomer(customer.id)} key={customer.id}>
        <TableCell component='th' scope='row'>
          {customer.name}
        </TableCell>
        <TableCell>{customer.contact}</TableCell>
        <TableCell>{customer.phone}</TableCell>
        <TableCell>{customer.email}</TableCell>
        <TableCell align='right'>
          <IconButton className={classes.editButton} onClick={e => editCustomer(e, customer.id)}>
            <EditIcon />
          </IconButton>
          <IconButton className={classes.deleteButton} onClick={toggleDialog}>
            <ClearIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      {openDialog && <ConfirmDialog text={MESSAGES.CONFIRM_DELETE_CUSTOMER} open={openDialog} closeModal={e => setOpenDialog(false)} onConfirm={deleteCustomer} onCancel={e => setOpenDialog(false)} />}
    </>
  );
};

AdminCustomersTableRow.propTypes = {
  customer: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

const styles = theme => ({
  editButton: {
    color: blue[500]
  },
  deleteButton: {
    color: red[700]
  }
});

export default withStyles(styles)(withRouter(AdminCustomersTableRow));
