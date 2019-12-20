import React from "react";
import clsx from "clsx";
import { createStyles, lighten, makeStyles, Theme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import { TableOrder, stableSort, getSorting } from "./CustomerTableEnhancedUtils";
import { Skeleton } from "@material-ui/lab";
import { TableHeadCell } from "../../Tables/SortingTable/SortingTable";
import { useHistory } from "react-router-dom";
import routes from "../../../routes";

const headCells: TableHeadCell[] = [
  { id: "name", numeric: false, disablePadding: false, label: "Nom" },
  { id: "contact", numeric: false, disablePadding: false, label: "Contact" },
  { id: "phone", numeric: false, disablePadding: false, label: "Téléphone" },
  { id: "email", numeric: false, disablePadding: false, label: "E-mail" }
];

interface CustomerTableEnhancedHeadProps {
  classes: ReturnType<typeof useStyles>;
  onRequestSort: (event: React.MouseEvent, property: any) => void;
  order: TableOrder;
  orderBy: string;
  rowCount: number;
  headCells: TableHeadCell[];
}

function CustomerTableEnhancedHead(props: CustomerTableEnhancedHeadProps) {
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

const useToolbarStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1)
    },
    highlight:
      theme.palette.type === "light"
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85)
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark
          },
    title: {
      flex: "1 1 100%"
    }
  })
);

interface CustomerTableEnhancedToolbarProps {
  numSelected: number;
}

const CustomerTableEnhancedToolbar = (props: CustomerTableEnhancedToolbarProps) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0
      })}
    >
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography className={classes.title} variant="h6" id="tableTitle">
          Nutrition
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%"
    },
    paper: {
      width: "100%",
      marginBottom: theme.spacing(2)
    },
    table: {
      minWidth: 750
    },
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
  })
);

type CustomerTableEnhancedProps = {
  rows: any;
  isLoading?: boolean;
};

export const CustomerTableEnhanced: React.FC<CustomerTableEnhancedProps> = ({ rows, isLoading = false }) => {
  const classes = useStyles();
  const [order, setOrder] = React.useState<TableOrder>("asc");
  const [orderBy, setOrderBy] = React.useState<string>("id");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const history = useHistory();

  const handleRequestSort = (event: React.MouseEvent, property: any) => {
    const isDesc = orderBy === property && order === "desc";
    setOrder(isDesc ? "asc" : "desc");
    setOrderBy(property);
  };

  const handleClick = (event: React.MouseEvent, id: number) => {
    history.push(routes.CUSTOMERS_DETAIL.path.replace(":id", id.toString()));
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
      <Table className={classes.table} aria-labelledby="customers-table-enhanced" aria-label="customers-table-enhanced">
        <CustomerTableEnhancedHead classes={classes} order={order} orderBy={orderBy} onRequestSort={handleRequestSort} rowCount={rows.length} headCells={headCells} />
        <TableBody>
          {!isLoading && rows ? (
            stableSort(rows, getSorting(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row: any, index: number) => (
                <TableRow hover onClick={event => handleClick(event, row.id)} tabIndex={-1} key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell>{row.contact}</TableCell>
                  <TableCell>{row.phone}</TableCell>
                  <TableCell>{row.email}</TableCell>
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
            </TableRow>
          )}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[25, 50, 75, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        labelRowsPerPage="Lignes par page"
        labelDisplayedRows={info => `${info.from}-${info.to} sur ${info.count}`}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  );
};
