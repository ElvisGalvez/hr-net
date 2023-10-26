import React from 'react';
import { TableCell } from '../../atoms/TableCell';
import './TableRow.css';

export const TableRow = ({ row, prepareRow }) => {
    prepareRow(row);

    return (
        <tr className="table-row">
            {row.cells.map(cell => (
                <TableCell key={cell.id} cell={cell} />
            ))}
        </tr>
    );
};
