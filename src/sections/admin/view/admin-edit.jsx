import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import Button from '@mui/material/Button';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';

export default function AdminEdit({ open, value, onClose }) {
  const [admin, setAdmin] = useState(null);    // effect runs on component mount
  const { register, handleSubmit, reset } = useForm();
  useEffect(() => {
    if (!!open) {
      fetch(`https://65b4c5bf41db5efd2866e486.mockapi.io/api/v1/users/${value}`)
        .then((data) => data.json())
        .then((data) => setAdmin(data));
    }
  }, [open]);
  useEffect(() => {
    // reset form with user data
    reset(admin);
  }, [admin]);

  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

  const onSubmit = async data => {
    await fetch(`https://65b4c5bf41db5efd2866e486.mockapi.io/api/v1/users/${value}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    onClose();
  };

  return <Dialog
    open={open}
    onClose={onClose}
    PaperProps={{
      component: 'form',
      onSubmit: handleSubmit(onSubmit),
    }}
  >
    <DialogTitle>Edit Admin</DialogTitle>
    <DialogContent>
      <input {...register('name')} />

      <input {...register('country')} />

      <input {...register('city')} />
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Cancel</Button>
      <Button type="submit">Submit</Button>
    </DialogActions>
  </Dialog>
    ;
}