import React from 'react';
import './PaginationControls.css'

export const PaginationControls = ({ pageIndex, setPageIndex, pageCount }) => {
  return (
    <div className="pagination">
      <button onClick={() => setPageIndex(0)} disabled={pageIndex === 0}>
        {'<<'}
      </button>
      <button onClick={() => setPageIndex(old => Math.max(0, old - 1))} disabled={pageIndex === 0}>
        {'<'}
      </button>
      <button onClick={() => setPageIndex(old => Math.min(pageCount - 1, old + 1))} disabled={pageIndex === pageCount - 1}>
        {'>'}
      </button>
      <button onClick={() => setPageIndex(pageCount - 1)} disabled={pageIndex === pageCount - 1}>
        {'>>'}
      </button>
    </div>
  );
};