import * as React from 'react';
import styles from './Table.module.scss';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { IconButton, TableFooter, TablePagination, TableSortLabel } from '@mui/material';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { useMainContext } from '../../context/MainContext';
import DeleteModal from '../Modals/DeleteModal';
import EditModal from '../Modals/EditModal';

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const JobTable = () => {
  const { filteredJobs, handleSort, order, orderBy, filteredArray } = useMainContext();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [jobID, setJobID] = React.useState('');

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredJobs.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper} className={styles.tableContainer}>
      <DeleteModal open={openDelete} setOpen={setOpenDelete} jobID={jobID} />
      {openEdit && <EditModal open={openEdit} setOpen={setOpenEdit} jobID={jobID} />}
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow className={styles.tableHead}>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'name' ? true : false}
                direction={orderBy === 'name' ? order : 'asc'}
                onClick={(event) => handleSort(event, 'name')}
              >
                Name
              </TableSortLabel>
            </TableCell>
            <TableCell align="left">
              <TableSortLabel
                active={orderBy === 'priority' ? true : false}
                direction={orderBy === 'priority' ? order : 'asc'}
                onClick={(event) => handleSort(event, 'priority')}
              >
                Priority
              </TableSortLabel>
            </TableCell>
            <TableCell align="left">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredArray
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((job, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <span className={styles.name}>{job.name}</span>
                </TableCell>
                <TableCell align="left">
                  <span
                    style={{ backgroundColor: job.priority === 'urgent' ? '#e57373' : job.priority === 'regular' ? '#ffb74d' : '#4fc3f7' }}
                    className={styles.priority}>{job.priority}
                  </span>
                </TableCell>
                <TableCell align="left">
                  <div className={styles.iconGroup}>
                    <span className={styles.action}
                      onClick={() => {
                        setOpenEdit(true);
                        setJobID(job.id);
                      }}
                    >
                      <EditOutlinedIcon />
                    </span>
                    <span className={styles.action}
                      onClick={() => {
                        setOpenDelete(true);
                        setJobID(job.id);
                      }}
                    >
                      <DeleteOutlineIcon />
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: filteredJobs.length }]}
              colSpan={3}
              count={filteredJobs.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default JobTable;