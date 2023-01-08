import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import styles from './ModalStyles.module.scss';
import Button from '@mui/material/Button';
import { useMainContext } from '../../context/MainContext';
import { Grid } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const DeleteModal = ({ open, setOpen, jobID }) => {
  const { deleteJob } = useMainContext();
  const handleClose = () => setOpen(false);

  const handleDelete = () => {
    deleteJob(jobID);
    setOpen(false);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box className={styles.deleteModal}>
          <ErrorOutlineIcon sx={{ fontSize: 50, color: '#f44336' }} />
          <Typography variant="h5" component="h3"
            sx={{
              fontWeight: 'bold',
              textAlign: 'center',
              mb: 3
            }}
          >
            Are you sure you want to delete it?
          </Typography>
          <Grid container justifyContent="center" alignItems="center" spacing={4}>
            <Grid item lg={6} md={6} sm={6} xs={6}>
              <Button
                fullWidth
                onClick={handleClose}
                variant="contained"
                size="large"
                sx={{
                  backgroundColor: '#e2e2e2',
                  color: '#000',
                  '&:hover': { backgroundColor: '#e2e2e2' }
                }}>
                Cancel
              </Button>
            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={6}>
              <Button
                variant="contained"
                color="error"
                size="large"
                fullWidth
                onClick={handleDelete}
              >
                Approve
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div >
  );
};

export default DeleteModal;