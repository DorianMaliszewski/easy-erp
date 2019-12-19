import React from "react";
import PropTypes from "prop-types";
import { TableCell, TableRow, Input, IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { useBillFormContext } from "../../../providers/BillFormProvider";

const BillFormRow: React.FC<any> = ({ line, index }) => {
  const billForm = useBillFormContext();
  const handleChange = (field: any, value: any) => {
    billForm.handleLineChange(index, field, value);
  };

  const getPostTaxPrice = () => {
    return ((1 + billForm.bill.tva) * line.preTaxPrice).toFixed(2);
  };

  const getTotal = () => {
    return ((1 + billForm.bill.tva) * line.preTaxPrice * line.quantity).toFixed(2);
  };

  return (
    <TableRow>
      <TableCell>
        <Input
          fullWidth
          inputProps={{
            "aria-label": "Description"
          }}
          value={line.description}
          onChange={(e: any) => handleChange("description", e.target.value)}
        />
      </TableCell>
      <TableCell align="right">
        <Input
          type="number"
          inputProps={{
            "aria-label": "Quantité"
          }}
          value={line.quantity}
          onChange={(e: any) => handleChange("quantity", parseFloat(e.target.value))}
        />
      </TableCell>
      <TableCell align="right">
        <Input
          type="number"
          inputProps={{
            "aria-label": "Prix Unitaire Hors Taxes"
          }}
          value={line.preTaxPrice}
          onChange={(e: any) => handleChange("preTaxPrice", parseFloat(e.target.value))}
        />
      </TableCell>
      <TableCell align="right">{getPostTaxPrice()}</TableCell>
      <TableCell align="right">{getTotal()}</TableCell>
      <TableCell>
        {index !== 0 && (
          <IconButton style={{ color: "red" }} aria-label="Delete" onClick={(e: any) => billForm.delLine(index)}>
            <DeleteIcon />
          </IconButton>
        )}
      </TableCell>
    </TableRow>
  );
};

BillFormRow.propTypes = {
  line: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired
};

export default BillFormRow;
