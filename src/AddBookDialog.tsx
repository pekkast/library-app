import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { BookItem } from './models';

export type AddBookDialogProps = {
    onSave: (book: BookItem) => void;
}

export default function AddBookDialog({ onSave }: AddBookDialogProps) {
  const [open, setOpen] = useState(false);

  const [writer, setWriter] = useState('');
  const [title, setTitle] = useState('');
  const [isbn, setIsbn] = useState('');
  const [error, setError] = useState<{[key: string]: boolean;}>({})

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    if (!writer) {
        setError({ writer: true });
        return;
    }
    if (!title) {
        setError({ title: true });
        return;
    }
    if (!isbn) {
        setError({ isbn: true });
        return;
    }
    setError({});
    onSave({ writer, title, isbn });
    setOpen(false);
  };

  return (
    <>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add book
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add book</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add new book. Fill all fields.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="writer"
            label="Writer"
            type="text"
            error={error.writer}
            fullWidth
            onBlur={(e) => setWriter(e.target.value)}
          />
          <TextField
            margin="dense"
            id="title"
            label="Title"
            type="text"
            error={error.title}
            fullWidth
            onBlur={(e) => setTitle(e.target.value)}
          />
          <TextField
            margin="dense"
            id="isbn"
            label="ISBN"
            type="text"
            error={error.isbn}
            fullWidth
            onBlur={(e) => setIsbn(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}