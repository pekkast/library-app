import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { BookItem } from './models';

export type BookTableProps = {
    books: BookItem[];
}

export default function BookTable({ books }: BookTableProps) {
    return (
      <TableContainer component={Paper}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Writer</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>ISBN</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map((book) => (
              <TableRow key={book.isbn}>
                <TableCell component="th" scope="row">
                  {book.writer}
                </TableCell>
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.isbn}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }