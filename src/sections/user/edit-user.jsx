import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import Button from '@mui/material/Button';
import { useForm } from 'react-hook-form';

export default function EditUser({ open, value, onClose }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({defaultValues: value});

  return <Dialog
    open={open}
    onClose={onClose}
    PaperProps={{
      component: 'form',
      onSubmit: (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries(formData.entries());
        console.log(formJson);
      },
    }}
  >
    <DialogTitle>Subscribe</DialogTitle>
    <DialogContent>
      <DialogContentText>
        To subscribe to this website, please enter your email address here. We
        will send updates occasionally.
      </DialogContentText>
      <input type='hidden' defaultValue="test" {...register('id')} />
      <input {...register('name')} />

      <input {...register('company')} />

      <input {...register('role')} />

      <input {...register('status')} />
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Cancel</Button>
      <Button type="submit">Subscribe</Button>
    </DialogActions>
  </Dialog>
    ;
}