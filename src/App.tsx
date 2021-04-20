import {
  AppBar, Button, Container, CssBaseline, Grid,
  Toolbar, Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import BooksIcon from '@material-ui/icons/LibraryBooks';
import { ChangeEvent, useRef, useState } from 'react';
import AddBookDialog from './AddBookDialog';
import BookTable from './BookTable';
import { BookItem } from './models';
import { parseBooks, sortByWriter } from './utils';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
}));

export default function App() {
  const classes = useStyles();

  const fileInput = useRef<HTMLInputElement>(null);

  const [books, setBooks] = useState<BookItem[]|undefined>(undefined);
  
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    parseBooks(e.target.files, setBooks)
  }

  return (
    <>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <BooksIcon className={classes.icon} />
          <Typography variant="h6" color="inherit" noWrap>
            Library app
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="md">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Library catalog
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              {books === undefined ? 'Setup library catalog' : 'Work with library catalog'}
            </Typography>
            <div className={classes.heroButtons}>
              {books === undefined && (
                <Grid container spacing={2} justify="center">                
                  <Grid item>
                    <input type="file" ref={fileInput} onChange={handleInputChange} accept="application/json" style={{display:'none'}} />
                    <Button type="button" onClick={() => fileInput.current?.click()}>Give initial list of books</Button>
                  </Grid>
                  <Grid item>                  
                    <Button type="button" onClick={() => setBooks([])}>Start from scratch</Button>
                  </Grid>
                </Grid>
              )}
              {books !== undefined && (
                <Grid container spacing={2} justify="center">
                  <Grid item>
                    <AddBookDialog onSave={(book: BookItem) => setBooks(books.concat(book))} />
                  </Grid>
                </Grid>
              )}
            </div>
          </Container>
        </div>
        {books !== undefined && (
          <Container maxWidth="md">
            <BookTable books={sortByWriter(books)} />
          </Container>
        )}
      </main>
    </>
  );
}
