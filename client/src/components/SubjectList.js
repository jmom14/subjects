import React, { useState } from 'react'
import { Table } from '@mantine/core';
import { Badge } from '@mantine/core';
import { formatDate, getColorBadge } from '../helpers';
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";
import { COLUMNS, ORDER_DIRECTION } from '../constants';
import { Pagination } from '@mantine/core';

export default function SubjectList(props) {
    const [activePage, setPage] = useState(1);
    const { subjects, onHeaderClick, sortBy, direction, total, onPageClick } = props;

    const handlePageChange = (page) => {
        setPage(page);
        onPageClick(page)
    }

    const getSortcIcon = (column) => {
        if (sortBy === column) {
            if (direction === ORDER_DIRECTION.ASC) {
                return <IoMdArrowDropup />
            } else {
                return <IoMdArrowDropdown />
            }
        }
        return null;
    }
    const rows = subjects.map((subject) => {
        const color = getColorBadge(subject.status);
        return (
            <Table.Tr key={subject.id}>
                <Table.Td>{subject.name}</Table.Td>
                <Table.Td>{subject.sex}</Table.Td>
                <Table.Td>{formatDate(new Date(subject.diagnosis_date))}</Table.Td>
                <Table.Td><Badge color={color}>{subject.status}</Badge></Table.Td>
            </Table.Tr>
        )
    });

    return (
        <>
            <Table>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th
                            className="App-pointer App-column"
                            onClick={() => onHeaderClick(COLUMNS.NAME)}
                        >
                            Name {getSortcIcon(COLUMNS.NAME)}
                        </Table.Th>
                        <Table.Th className="App-pointer App-column" onClick={() => onHeaderClick(COLUMNS.SEX)}>Sex {getSortcIcon(COLUMNS.SEX)}</Table.Th>
                        <Table.Th className="App-pointer App-column" onClick={() => onHeaderClick(COLUMNS.DIAGNOSIS_DATE)}>Diagnosis Date{getSortcIcon(COLUMNS.DIAGNOSIS_DATE)}</Table.Th>
                        <Table.Th className="App-pointer App-column" onClick={() => onHeaderClick(COLUMNS.STATUS)}>Status{getSortcIcon(COLUMNS.STATUS)}</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
            <Pagination className="App-pagination" value={activePage} total={Math.ceil(total / 10)} onChange={handlePageChange} />
        </>
    )
}
