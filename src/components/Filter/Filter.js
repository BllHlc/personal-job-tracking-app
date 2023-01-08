import React from 'react';
import styles from './Filter.module.scss';
import { Search } from '@mui/icons-material';
import { FormControl, Grid, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material';
import { useMainContext } from '../../context/MainContext';

const Filter = () => {
  const { filterPriority, setFilterPriority, filterName, setFilterName } = useMainContext();

  const handleChange = (event) => {
    setFilterPriority(event.target.value);
  };

  return (
    <>
      <div className={styles.search}>
        <Grid spacing={2} container>
          <Grid item lg={8} md={8} sm={12} xs={12}>
            <FormControl fullWidth >
              <InputLabel htmlFor="job-name">Job Name</InputLabel>
              <OutlinedInput
                id="job-name"
                startAdornment={
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>}
                label="Job Name"
                value={filterName}
                onChange={(e) => setFilterName(e.target.value)}
              />
            </FormControl>
          </Grid>
          <Grid item lg={4} md={4} sm={12} xs={12}>
            <FormControl fullWidth >
              <InputLabel id="priority-filter-label" >Job Priority</InputLabel>
              <Select
                labelId="priority-filter-label"
                id="priority-filter"
                label="Job Priority"
                value={filterPriority}
                onChange={handleChange}
              >
                <MenuItem value={"all"} selected>Priority (all)</MenuItem>
                <MenuItem value={"trivial"}>Trivial</MenuItem>
                <MenuItem value={"regular"}>Regular</MenuItem>
                <MenuItem value={"urgent"}>Urgent</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Filter;