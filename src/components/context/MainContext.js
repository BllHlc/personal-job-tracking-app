import { createContext, useContext, useEffect, useState } from 'react';

const MainContext = createContext();

const MainContextProvider = ({ children }) => {
  const [jobs, setJobs] = useState(localStorage.getItem('jobs') ? JSON.parse(localStorage.getItem('jobs')) : []);
  const [filterPriority, setFilterPriority] = useState('all');
  const [filterName, setFilterName] = useState('');

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

  useEffect(() => {
    localStorage.setItem('jobs', JSON.stringify(jobs));
  }, [jobs]);

  const values = {
    jobs,
    addJobs,
    filteredJobs,
    filterPriority,
    setFilterPriority,
    filterName,
    setFilterName
  };

  return (
    <MainContext.Provider value={values}    >
      {children}
    </MainContext.Provider>
  );
};

const useMainContext = () => useContext(MainContext);
export { MainContextProvider, useMainContext };