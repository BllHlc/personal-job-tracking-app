import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import styles from './ModalStyles.module.scss';
import Button from '@mui/material/Button';
import { useMainContext } from '../../context/MainContext';
import { FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';

const EditModal = ({ open, setOpen, jobID }) => {
  const { editJobPriority, filteredArray } = useMainContext();
  const handleClose = () => setOpen(false);
  const job = filteredArray.find((job) => job.id === jobID);
  const [priority, setPriority] = React.useState(job.priority);

  const handleEdit = () => {
    editJobPriority(jobID, priority);
    setOpen(false);
  };


  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box className={styles.editModal}>
          <Typography variant="h4" component="h2"
            sx={{
              fontWeight: 'bold',
              textAlign: 'center',
            }}
          >
            Job Edit
          </Typography>
          <Box className={styles.editModalInputs}>
            <Typography sx={{ textAlign: 'left' }}>
              Job Name
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              disabled
              value={job.name}
              sx={{ mb: 3 }}
            />
            <Typography sx={{ textAlign: 'left', mb: 1 }}>
              Job Priority
            </Typography>
            <FormControl sx={{ width: "100%", mb: 3 }}
              required
            >
              <InputLabel id="priority-modal-label"
                sx={{ bgcolor: 'white' }}
              >Job Priority</InputLabel>
              <Select
                labelId="priority-modal-label"
                value={priority}
                label="Age"
                onChange={(e) => setPriority(e.target.value)}
                sx={{ textAlign: 'left' }}
              >
                <MenuItem value={"trivial"}>Trivial</MenuItem>
                <MenuItem value={"regular"}>Regular</MenuItem>
                <MenuItem value={"urgent"}>Urgent</MenuItem>
              </Select>
            </FormControl>
          </Box>
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
                onClick={handleEdit}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
};

export default EditModal;