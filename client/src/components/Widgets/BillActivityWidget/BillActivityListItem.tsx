import React, { useState } from "react";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import BillStatusIcon, { BILL_STATUS } from "../../Bills/BillStatusIcon";
import moment from "moment";
import BillDetailDialog from "../../Bills/BillDetailDialog";

const BillActivityListItem: React.FC<any> = ({ bill }) => {
  const [openDetail, setOpenDetail] = useState(false);

  const getActivityText = () => {
    return "Facture n°" + bill.id + " pour " + bill.client + " " + getActivityStatustext(bill);
  };

  const getSinceTimeActivity = () => {
    return moment(bill.updateAt).fromNow();
  };

  const showBillDetail = (e: any) => {
    setOpenDetail(true);
  };

  return (
    <>
      <ListItem button onClick={showBillDetail}>
        <ListItemIcon>
          <BillStatusIcon status={bill.status} />
        </ListItemIcon>
        <ListItemText primary={getActivityText()} secondary={getSinceTimeActivity()} />
      </ListItem>
      {openDetail && <BillDetailDialog bill={bill} open={openDetail} closeModal={(e: any) => setOpenDetail(false)} />}
    </>
  );
};

const getActivityStatustext = (bill: any) => {
  switch (bill.status) {
    case BILL_STATUS.WAITING_CUSTOMER.enum:
      return "à été envoyé";
    case BILL_STATUS.ACCEPTED.enum:
      return "à été accepté";
    case BILL_STATUS.CANCELED.enum:
      return "à été refusé";
    default:
      return "activité inconnue";
  }
};

export default BillActivityListItem;
