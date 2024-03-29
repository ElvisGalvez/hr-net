import React from 'react';
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getSortedRowModel,
    getPaginationRowModel,
} from '@tanstack/react-table';
import './EmployeeTable.css';
import { useDispatch, useSelector } from 'react-redux';
import { setSorting } from '../../../state/employeeSlice';
import EntriesInfo from '../../atoms/EntriesInfo';
import { PaginationControls } from '../../atoms/PaginationControls';

const EmployeeTable = ({ data, pageSize, pageIndex, setPageIndex, openEditModal, openDeleteModal }) => {
    const dispatch = useDispatch();
    const sorting = useSelector((state) => state.employee.sorting);
    const columnHelper = createColumnHelper();

    const columns = [
        columnHelper.accessor('firstName', {
            header: 'First Name',
            cell: info => info.getValue(),
            enableSorting: true,
        }),
        columnHelper.accessor('lastName', {
            header: 'Last Name',
            cell: info => info.getValue(),
            enableSorting: true,
        }),

        columnHelper.accessor('startDate', {
            header: 'Start Date',
            cell: info => {
                const date = new Date(info.getValue());
                return date.toLocaleDateString();
            },
            enableSorting: true,
        }),
        columnHelper.accessor('department', {
            header: 'Department',
            cell: info => info.getValue(),
            enableSorting: true,
        }),
        columnHelper.accessor('birthDate', {
            header: 'Date of Birth',
            cell: info => {
                const date = new Date(info.getValue());
                return date.toLocaleDateString();
            },
            enableSorting: true,
        }),
        columnHelper.accessor('street', {
            header: 'Street',
            cell: info => info.getValue(),
            enableSorting: true,
        }),
        columnHelper.accessor('city', {
            header: 'City',
            cell: info => info.getValue(),
            enableSorting: true,
        }),
        columnHelper.accessor('state', {
            header: 'State',
            cell: info => info.getValue(),
            enableSorting: true,
        }),
        columnHelper.accessor('zipCode', {
            header: 'Zip Code',
            cell: info => info.getValue(),
            enableSorting: true,
        }),

        columnHelper.accessor('actions', {
            header: () => <span>Actions</span>,
            cell: info => (
                <div>
                    <i
                        className="fa-solid fa-pen-to-square"
                        onClick={() => handleEditClick(info.row)}
                    ></i>
                    <i
                        className="fa-solid fa-user-minus"
                        onClick={() => handleDeleteClick(info.row)}
                    ></i>
                </div>
            ),
            enableSorting: false,
        }),
    ];

    const setSortingHandler = (updater) => {
        if (typeof updater === 'function') {
            const newSorting = updater(sorting);
            dispatch(
                setSorting(
                    newSorting.map((sort) => ({
                        id: sort.id,
                        desc: sort.desc,
                    }))
                )
            );
        } else {
            console.error(
                'Expected updater to be a function, but received:',
                updater
            );
        }
    };
    const tableInstance = useReactTable({
        data,
        columns,
        state: {
            sorting,
            pagination: { pageIndex, pageSize },
          },
        onSortingChange: setSortingHandler,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    const handleEditClick = (row) => {
        openEditModal(row.original);
    };

    const handleDeleteClick = (row) => {
        openDeleteModal(row.original);
    };

    

    const { rows } = tableInstance.getRowModel();
    const totalEntries = data.length;
    const currentPage = tableInstance.getState().pagination.pageIndex + 1;

    return (
        <div className="employee-table-container">
            <table className="table">
                <thead>
                    {tableInstance.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                const canSort = header.column.getCanSort();
                                const isSorted = header.column.getIsSorted();
                                return (
                                    <th
                                        key={header.id}
                                        onClick={
                                            canSort ? header.column.getToggleSortingHandler() : undefined
                                        }
                                    >
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                        {canSort && (
                                            isSorted ? (
                                                isSorted === 'desc' ? (
                                                    <i className="fa-solid fa-caret-down sort-icon"></i>
                                                ) : (
                                                    <i className="fa-solid fa-caret-up sort-icon"></i>
                                                )
                                            ) : (
                                                <i className="fa-solid fa-sort sort-icon"></i>
                                            )
                                        )}
                                    </th>
                                );
                            })}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {rows.map((row) => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id} className="table-cell">
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <PaginationControls
        pageIndex={pageIndex}
        setPageIndex={setPageIndex}
        pageCount={tableInstance.getPageCount()}
      />
      <EntriesInfo
        totalEntries={totalEntries}
        currentPage={currentPage}
        pageSize={pageSize}
      />
        </div>
    );
};

export default EmployeeTable;