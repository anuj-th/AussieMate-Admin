import React from "react";

const PaginationRanges = ({
  currentPage,
  rowsPerPage,
  totalItems,
  onPageChange,
  onRowsPerPageChange,
  rowsPerPageOptions = [5, 10, 20],
}) => {
  const totalPages = Math.ceil(totalItems / rowsPerPage);

  return (
    <div className="flex flex-wrap justify-between items-center px-5 py-4 text-sm text-secondary gap-3">
      {/* Rows per page */}
      <div className="flex items-center gap-2">
        <span className="bg-secondary-light">Show</span>

        <select
          value={rowsPerPage}
          onChange={(e) => {
            onRowsPerPageChange(Number(e.target.value));
            onPageChange(1); // reset page
          }}
          className="border border-[#E4E6EF] rounded-md px-2 py-1.5 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
        >
          {rowsPerPageOptions.map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>

        <span className="bg-secondary-light">per page</span>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center gap-3">
        <span className="text-xs text-gray-500">
          {(currentPage - 1) * rowsPerPage + 1}–
          {Math.min(currentPage * rowsPerPage, totalItems)} of {totalItems}
        </span>

        {/* Prev */}
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="px-2 py-1 rounded border border-[#E4E6EF] text-gray-500 hover:bg-gray-100 disabled:opacity-50"
        >
          ←
        </button>

        {/* Page Numbers */}
        <div className="flex items-center gap-1">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`px-3 py-1 rounded-md ${
                page === currentPage
                  ? "bg-[#F1F4F9] text-primary"
                  : " text-gray-600 hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        {/* Next */}
        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="px-2 py-1 rounded border border-[#E4E6EF] text-gray-500 hover:bg-gray-100 disabled:opacity-50"
        >
          →
        </button>
      </div>
    </div>
  );
};

export default PaginationRanges;
