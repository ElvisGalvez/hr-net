import React from 'react';
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getSortedRowModel,
} from '@tanstack/react-table';
import './EmployeeTable.css';

const EmployeeTable = ({ data, pageSize, openEditModal, openDeleteModal }) => {
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

    const [sorting, setSorting] = React.useState([]);

    const slicedData = React.useMemo(() => {
        return data.slice(0, pageSize);
    }, [data, pageSize]);

    const tableInstance = useReactTable({
        data: slicedData,
        columns,
        state: {
            sorting,
        },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
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
                {tableInstance.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map(header => {
                            const canSort = header.column.getCanSort();
                            const isSorted = header.column.getIsSorted();
                            return (
                                <th key={header.id} onClick={canSort ? header.column.getToggleSortingHandler() : undefined}>
                                    {flexRender(header.column.columnDef.header, header.getContext())}
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
                {tableInstance.getRowModel().rows.map(row => (
                    <tr key={row.id}>
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