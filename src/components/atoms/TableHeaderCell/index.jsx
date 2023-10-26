import React from 'react';
import './TableHeaderCell.css';

export const TableHeaderCell = ({ column }) => {
    return (
        <th className="table-header-cell">
            {column.render('Header')}
        </th>
    );
};