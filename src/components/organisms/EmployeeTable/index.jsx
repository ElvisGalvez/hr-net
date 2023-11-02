import React from 'react';
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table';
import './EmployeeTable.css';

const EmployeeTable = ({ data, openEditModal, openDeleteModal }) => {
    const columnHelper = createColumnHelper();
    const columns = [
        columnHelper.accessor('firstName', {
            header: 'First Name',
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('lastName', {
            header: 'Last Name',
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('startDate', {
            header: 'Start Date',
            cell: info => {
                const date = new Date(info.getValue());
                return date.toLocaleDateString();
            },
        }),
        columnHelper.accessor('department', {
            header: 'Department',
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('birthDate', {
            header: 'Date of Birth',
            cell: info => {
                const date = new Date(info.getValue());
                return date.toLocaleDateString();
            },
        }),
        columnHelper.accessor('street', {
            header: 'Street',
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('city', {
            header: 'City',
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('state', {
            header: 'State',
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('zipCode', {
            header: 'Zip Code',
            cell: info => info.getValue(),
        }),
        
        columnHelper.accessor('actions', {
            header: 'Actions',
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
        }),
    ];

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    const handleEditClick = (row) => {
        openEditModal(row.original);
    };

    const handleDeleteClick = (row) => {
        openDeleteModal(row.original);
      };

    return (
        <table className="table">
            <thead>
                {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id} className="table-header">
                        {headerGroup.headers.map(header => (
                            <th key={header.id} className="table-header-cell">
                                {header.isPlaceholder
                                    ? null
                                    : flexRender(header.column.columnDef.header, header.getContext())
                                }
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody>
                {table.getRowModel().rows.map(row => (
                    <tr key={row.id} className="table-row">
                        {row.getVisibleCells().map(cell => (
                            <td key={cell.id} className="table-cell">
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default EmployeeTable;
