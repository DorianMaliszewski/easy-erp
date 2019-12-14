import React, { useContext } from "react";
import { TableBody } from "@material-ui/core";
import QuoteFormRow from "./QuoteFormRow";
import QuoteFormContext from "../../contexts/QuoteFormContext";

const QuoteFormBody: React.FC<any> = () => {
  const quoteFormContext = useContext(QuoteFormContext);
  return (
    <>
      <TableBody style={{ marginBottom: 50 }}>
        {quoteFormContext.quote.lines.map((line: any, index: number) => (
          <QuoteFormRow key={index} line={line} index={index} />
        ))}
      </TableBody>
    </>
  );
};

QuoteFormBody.propTypes = {};

export default QuoteFormBody;
