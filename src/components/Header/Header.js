import React from 'react';
import styles from './Header.module.scss';
import { Logo } from '../icons';
import { Box } from '@mui/system';
import { Button, Divider, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const Header = () => {
  return (
    <div className={styles.header}>
      <Logo fill="#f65235" width="100" height="100" />
      <Divider sx={{ width: "100%", height: 1, bgcolor: "grey.200", marginTop: 1 }} />
      <h1 className={styles.title}>Create New Job</h1>
      <Box sx={{ flexGrow: 1 }}>
        <Grid spacing={2} container >
          <Grid item lg={7} md={12} sm={12} xs={12}>
            <TextField label="Job Name" variant="outlined" sx={{ width: "100%" }} required
              maxLength="255"
            />
          </Grid>
          <Grid item lg={3} md={12} sm={12} xs={12}>
            <FormControl sx={{ width: "100%" }} required>
              <InputLabel id="priority-label"
                sx={{ bgcolor: 'white' }}
              >Job Priority</InputLabel>
              <Select
                labelId="priority-label"
                id="priority"
                // value={priority }
                label="Age"
              // onChange={handleChange}
              >
                <MenuItem value={"trivial"}>Trivial</MenuItem>
                <MenuItem value={"regular"}>Regular</MenuItem>
                <MenuItem value={"urgent"}>Urgent</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item lg={2} md={12} sm={12} xs={12}>
            <Button variant="contained" startIcon={<AddIcon />} size="large"
              sx={{ height: 56, width: "100%" }}
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