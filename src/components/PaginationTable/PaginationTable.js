import React from "react";
import styles from './PaginationTable.module.css';

function Pagination({
  pageIndex,
  pageOptions,
  canPreviousPage,
  canNextPage,
  pageSize,
  previousPage,
  nextPage,
  setPageSize,
}) {
  return (
    <div className={styles.pagination}>
      <span>
        Mostrando &nbsp;
        <strong>
          {pageIndex + 1} de {pageOptions.length}
        </strong>
      </span>
      <div className={styles.controls}>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          ←
        </button>
        <span>{pageIndex + 1}</span>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          →
        </button>
      </div>
      <select
        value={pageSize}
        onChange={(e) => setPageSize(Number(e.target.value))}
      >
        {[5, 10, 15].map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            Mostrar {pageSize}
          </option>
        ))}
      </select>
    </div>
  );
}

export { Pagination };
