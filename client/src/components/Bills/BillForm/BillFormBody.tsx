import React from "react";
import { TableBody } from "@material-ui/core";
import BillFormRow from "./BillFormRow";
import { useBillFormContext } from "../../../providers/BillFormProvider";

const BillFormBody: React.FC<any> = () => {
  const billForm = useBillFormContext();
  return (
    <>
      <TableBody style={{ marginBottom: 50 }}>
        {billForm.bill.lines.map((line: any, index: number) => (
          <BillFormRow key={index} line={line} index={index} />
        ))}
      </TableBody>
    </>
  );
};

BillFormBody.propTypes = {};

export default BillFormBody;
