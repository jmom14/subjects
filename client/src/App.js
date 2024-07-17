import React, { useEffect, useState, useReducer } from 'react';
import SubjectList from './components/SubjectList';
import { Button, Select, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import NewSubjectModal from './components/NewSubjectModal';
import { ADD, REPLACE, DEFAULT_DEBOUNCE_TIME, SEX_OPTIONS, STATUS_OPTIONS, initFilters, initErrors, COLUMNS, ORDER_DIRECTION } from './constants';
import { createSubject, fetchNameOptions, fetchSubjects } from './services/subjectService';
import { notifications } from '@mantine/notifications';
import { getErrors, reducer } from './helpers';
import './App.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/core/styles.css';

function App() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = React.useState("");
  const [total, setTotal] = useState(0);
  const [skip, setSkip] = useState(0);
  const [subjects, dispatch] = useReducer(reducer, []);
  const [nameOptions, setNameOptions] = useState([]);
  const [filters, setFilters] = useState(initFilters);
  const [errors, setErrors] = useState(initErrors);
  const [sortBy, setSortBy] = useState([COLUMNS.NAME, ORDER_DIRECTION.ASC]);
  const [opened, { open, close }] = useDisclosure(false);

  useEffect(() => {
    const getSubjects = async () => {
      const params = {
        ...filters,
        search: debouncedSearch,
        sort_by: sortBy[0],
        direction: sortBy[1],
        skip,
      };
      const { subjects: fetchedSubjects, count } = await fetchSubjects(params);
      setTotal(count);
      dispatch({ type: REPLACE, subjects: fetchedSubjects });
    }
    getSubjects();
  }, [debouncedSearch, filters, sortBy, skip]);

  useEffect(() => {
    const getNameOptions = async () => {
      const fetchedNameOptions = await fetchNameOptions();
      setNameOptions(fetchedNameOptions);
    }
    getNameOptions();
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearch(search);
    }, DEFAULT_DEBOUNCE_TIME);
    return () => clearTimeout(timeoutId);
  }, [search]);

  const resetErrors = () => {
    setErrors({})
  };

  const handleInputChange = (event) => {
    setSearch(event.target.value);
  };

  const handleFilterChange = (name, value) => {
    setFilters({
      ...filters,
      [name]: value
    })
  }

  const handleHeaderClick = (name) => {
    if (sortBy[0] === name) {
      setSortBy([name, sortBy[1] === ORDER_DIRECTION.ASC ? ORDER_DIRECTION.DESC : ORDER_DIRECTION.ASC]);
    } else {
      setSortBy([name, ORDER_DIRECTION.ASC]);
    }
  }

  const handlePageClick = (page) => {
    setSkip((page - 1) * 10);
  }

  const handleSubmit = async (subject) => {

    const newErrors = getErrors(subject);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const newSubject = await createSubject({ subject });

    close();
    if (!newSubject) {
      notifications.show({
        title: 'Error',
        message: 'Error creating subject',
        color: 'red',
      })
      return;
    }
    dispatch({ type: ADD, subjects: [newSubject] });
    notifications.show({
      title: 'Created',
      message: 'Subject created successfully',
      color: 'green',
    })
  }

  return (
    <div className="App">
      <div className='App-options-container'>
        <div className='App-options'>
          <Select
            label="Name"
            placeholder="Pick value"
            className='App-select'
            data={nameOptions}
            onChange={(value) => handleFilterChange(COLUMNS.NAME, value || '')}
            clearable
          />
          <Select
            label="Sex"
            placeholder="Pick value"
            data={SEX_OPTIONS}
            className='App-select'
            onChange={(value) => handleFilterChange(COLUMNS.SEX, value || '')}
            clearable
          />
          <Select
            label="Status"
            placeholder="Pick value"
            className='App-select'
            onChange={(value) => handleFilterChange(COLUMNS.STATUS, value || '')}
            data={STATUS_OPTIONS}
            clearable
          />
        </div>
        <Button variant="filled" onClick={open}>Create</Button>
      </div>
      <TextInput
        placeholder='Search subjects by name'
        onChange={handleInputChange}
        value={search}
        style={{ marginBottom: '30px' }}
      />
      <SubjectList
        subjects={subjects}
        onHeaderClick={handleHeaderClick}
        sortBy={sortBy[0]}
        direction={sortBy[1]}
        total={total}
        onPageClick={handlePageClick}
      />
      <NewSubjectModal
        opened={opened}
        close={close}
        onSubmit={handleSubmit}
        errors={errors}
        resetErrors={resetErrors}
      />
    </div>
  );
}

export default App;
