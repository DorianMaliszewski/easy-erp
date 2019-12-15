export class DTO<T> {
  numFound: number;
  items: T[];

  constructor() {
    this.numFound = 0;
    this.items = [];
  }
}
