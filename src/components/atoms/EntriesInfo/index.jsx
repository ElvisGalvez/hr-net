import React from 'react';
import './EntriesInfo.css';

const EntriesInfo = ({ totalEntries, currentPage, pageSize }) => {
    const start = (currentPage - 1) * pageSize + 1;
    const end = Math.min(currentPage * pageSize, totalEntries);

    return (
        <div className="entries-info">
            Showing {start} to {end} of {totalEntries} entries
        </div>
    );
};

export default EntriesInfo;
