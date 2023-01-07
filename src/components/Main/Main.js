import React from 'react';
import styles from './Main.module.scss';
import { Box } from '@mui/material';
import Filter from '../Filter/Filter';
import Table from '../Table';

const Main = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <div className={styles.header}>
        <h2>Job List</h2>
        <span> (3/3) </span>
      </div>
      <Filter />
      <Table />
    </Box >
  );
};

export default Main;