import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { TableCell, TableRow, Input, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import QuoteFormContext from '../../contexts/QuoteFormContext';

/**
 *
 * @param {QuoteLine} props
 */
const QuoteFormRow = ({ line, index }) => {
  const quoteFormContext = useContext(QuoteFormContext);
  const handleChange = (field, value) => {
    quoteFormContext.handleLineChange(index, field, value);
  };
  return (
    <TableRow>
      <TableCell>
        <Input
          fullWidth
          inputProps={{
            'aria-label': 'Description'
          }}
          value={line.description}
          onChange={e => handleChange('description', e.target.value)}
        />
      </TableCell>
      <TableCell align="right">
        <Input
          type="number"
          inputProps={{
            'aria-label': 'Quantité'
          }}
          value={line.quantity}
          onChange={e => handleChange('quantity', parseFloat(e.target.value, 10))}
        />
      </TableCell>
      <TableCell align="right">
        <Input
          type="number"
          inputProps={{
            'aria-label': 'Prix Unitaire Hors Taxes'
          }}
          value={line.puht}
          onChange={e => handleChange('puht', parseFloat(e.target.value, 10))}
        />
      </TableCell>
      <TableCell align="right">{line.puttc}</TableCell>
      <TableCell align="right">{line.total}</TableCell>
      <TableCell>
        {index !== 0 && (
          <IconButton style={{ color: 'red' }} aria-label="Delete" onClick={e => quoteFormContext.delLine(index)}>
            <DeleteIcon />
          </IconButton>
        )}
      </TableCell>
    </TableRow>
  );
};

QuoteFormRow.propTypes = {
  line: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired
};

export default QuoteFormRow;
