import React, { useContext } from 'react';
import { TableBody, withStyles } from '@material-ui/core';
import QuoteFormRow from './QuoteFormRow';
import QuoteFormContext from '../../contexts/QuoteFormContext';

const QuoteFormBody = ({ quote, addLine, classes }) => {
  const quoteFormContext = useContext(QuoteFormContext);
  return (
    <>
      <TableBody style={{ marginBottom: 50 }}>
        {quoteFormContext.quote.lines.map((line, index) => (
          <QuoteFormRow key={index} line={line} index={index} />
        ))}
      </TableBody>
    </>
  );
};

QuoteFormBody.propTypes = {};

export default QuoteFormBody;
