import React from 'react';
import './TableCell.css';

export const TableCell = ({ cell }) => {
  return (
    <td className="table-cell">
      {cell.render('Cell')}
    </td>
  );
};