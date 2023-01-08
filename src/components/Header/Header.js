import React, { useEffect } from 'react';
import styles from './Header.module.scss';
import { Logo } from '../icons';
import { Box } from '@mui/system';
import { Button, Divider, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useMainContext } from '../context/MainContext';

const Header = () => {
  const [name, setName] = React.useState('');
  const [priority, setPriority] = React.useState('');
  const [nameError, setNameError] = React.useState(false);
  const [priorityError, setPriorityError] = React.useState(false);
  const { addJobs } = useMainContext();

  useEffect(() => {
    if (name) setNameError(false);
    if (priority) setPriorityError(false);
  }, [name, priority]);

  const handleSubmit = () => {
    !name ? setNameError(true) : setNameError(false);
    !priority ? setPriorityError(true) : setPriorityError(false);

    if (!name || !priority) return;
    const priorityColor = priority === 'urgent' ? 'red' : priority === 'regular' ? 'orange' : 'blue';

    addJobs({ name, priority, priorityColor });
    setName('');
    setPriority('');
  };

  const onlyAlphaNumeric = (e) => {
    const regex = new RegExp(/^[a-zA-Z0-9 ]*$/);
    if (!regex.test(e.key)) {
      e.preventDefault();
    }
  };

  return (
    <div className={styles.header}>
      <Logo fill="#f65235" width="100" height="100" />
      <Divider sx={{ width: "100%", height: 1, bgcolor: "grey.200", marginTop: 1 }} />
      <h1 className={styles.title}>Create New Job</h1>
      <Box sx={{ flexGrow: 1 }}>
        <Grid spacing={2} container >
          <Grid item lg={7} md={12} sm={12} xs={12}>
            <TextField
              error={nameError}
              label="Job Name"
              variant="outlined"
              sx={{ width: "100%" }}
              required
              inputProps={{
                maxLength: 255,
              }}
              value={name}
              onChange={(e) => setName(e.target.value)}
              helperText={name.length === 0 ? "Job name is required" : ""}
              onKeyPress={(e) => onlyAlphaNumeric(e)}
            />
          </Grid>
          <Grid item lg={3} md={12} sm={12} xs={12}>
            <FormControl sx={{ width: "100%" }}
              required
              error={priorityError} >
              <InputLabel id="priority-label"
                sx={{ bgcolor: 'white' }}
              >Job Priority</InputLabel>
              <Select
                labelId="priority-label"
                id="priority"
                value={priority}
                label="Age"
                onChange={(e) => setPriority(e.target.value)}
              >
                <MenuItem value={"trivial"}>Trivial</MenuItem>
                <MenuItem value={"regular"}>Regular</MenuItem>
                <MenuItem value={"urgent"}>Urgent</MenuItem>
              </Select>
              {priority.length === 0 && < FormHelperText>Job priority is required</FormHelperText>}
            </FormControl>
          </Grid>
          <Grid item lg={2} md={12} sm={12} xs={12}>
            <Button variant="contained" startIcon={<AddIcon />} size="large"
              sx={{ height: 56, width: "100%" }}
              onClick={() => handleSubmit()}
            // disabled={name.length === 0 || priority.length === 0}
            >
              Create
            </Button>
          </Grid>
        </Grid>
      </Box>
    </div >
  );
};

export default Header;