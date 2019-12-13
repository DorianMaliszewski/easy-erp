import QuoteLine from './QuoteLine';

class Quote {
  /**
   *
   * @type {QuoteLine[]}
   * @memberof Quote
   */
  lines = [new QuoteLine()];
  createdAt;
  updatedAt;
  version;
  total;
  client;
  creator;
  deleted;
}

export default Quote;
