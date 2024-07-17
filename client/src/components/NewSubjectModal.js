import React, { useEffect, useState } from 'react'
import { Button, Modal, TextInput, Select } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { SEX_OPTIONS, STATUS_OPTIONS } from '../constants';
import '../styles/NewSubjectModal.css';

const initData = {
    name: '',
    sex: '',
    diagnosis_date: '',
    status: ''
}

export default function NewSubjectModal(props) {
    const { opened, close, errors, resetErrors, onSubmit } = props;
    const [data, setData] = useState(initData);

    useEffect(() => {
        setData(initData);
        resetErrors();
    }, [opened]);

    const handleChange = (name, value) => {
        setData({
            ...data,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        onSubmit(data);
    }

    return (
        <Modal opened={opened} onClose={close} title="Create Subject" centered>
            <form className="NewSubjectModal-form" onSubmit={handleSubmit}>
                <TextInput
                    label="Name"
                    placeholder="Enter name"
                    onChange={(event) => handleChange('name', event.target.value)}
                    value={data.name}
                    error={errors.name}
                />
                <Select label="Sex"
                    data={SEX_OPTIONS}
                    onChange={(value, _) => handleChange('sex', value)}
                    placeholder='Enter sex'
                    value={data.sex}
                    error={errors.sex}
                />
                <DateInput
                    label="Diagnosis date"
                    placeholder="Pick date"
                    value={data.diagnosis_date}
                    valueFormat="YYYY MMM DD"
                    onChange={(value) => handleChange('diagnosis_date', value)}
                    error={errors.diagnosis_date}
                />
                <Select
                    label="Status"
                    data={STATUS_OPTIONS}
                    placeholder='Enter status'
                    onChange={(value, _) => handleChange('status', value)}
                    value={data.status}
                    error={errors.status}
                />
                <Button type="submit" variant="filled">Create</Button>
            </form>
        </Modal>
    )
}
