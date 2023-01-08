/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useEffect, useState } from 'react';

const MainContext = createContext();

const MainContextProvider = ({ children }) => {
  const [jobs, setJobs] = useState(localStorage.getItem('jobs') ? JSON.parse(localStorage.getItem('jobs')) : []);
  const [filterPriority, setFilterPriority] = useState('all');
  const [filterName, setFilterName] = useState('');
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState(null);
  const [filteredArray, setFilteredArray] = useState([]);

  useEffect(() => {
    localStorage.setItem('jobs', JSON.stringify(jobs));
    setFilteredArray(filteredJobs);
  }, [jobs, filterPriority, filterName]);

  const addJobs = (job) => {
    setJobs([...jobs, job]);
  };

  const filteredJobs = jobs.filter((job) => {
    if (filterPriority === 'all') {
      return job.name.toLowerCase().includes(filterName.toLowerCase());
    } else {
      return job.priority === filterPriority && job.name.toLowerCase().includes(filterName.toLowerCase());
    }
  });

  const deleteJob = (id) => {
    const newJobs = jobs.filter((job) => job.id !== id);
    setJobs(newJobs);
  };

  const editJobPriority = (id, priority) => {
    const newJobs = jobs.map((job) => {
      if (job.id === id) {
        job.priority = priority;
        job.priorityColor = priority === 'urgent' ? 'red' : priority === 'regular' ? 'orange' : 'blue';
      }
      return job;
    });
    setJobs(newJobs);
    // handleSort(null, "priority");
  };

  const handleSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
    property = property === 'priority' ? 'priorityColor' : property;
    if (isAsc) {
      filteredJobs.sort((a, b) => (a[property] < b[property] ? 1 : -1));
    } else {
      filteredJobs.sort((a, b) => (a[property] > b[property] ? 1 : -1));
    }

    setFilteredArray(filteredJobs);
  };

  const values = {
    jobs,
    addJobs,
    filteredJobs,
    filterPriority,
    setFilterPriority,
    filterName,
    setFilterName,
    handleSort,
    order,
    orderBy,
    filteredArray,
    setFilteredArray,
    deleteJob,
    editJobPriority,
  };

  return (
    <MainContext.Provider value={values}    >
      {children}
    </MainContext.Provider>
  );
};

const useMainContext = () => useContext(MainContext);
export { MainContextProvider, useMainContext };