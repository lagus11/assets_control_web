import generateExcel from "zipcelx";
//https://codesandbox.io/s/react-table-excel-export-g7hoe?file=/src/App.js:6242-6255

function getHeader(column) {
    if (column.totalVisibleHeaderCount === 1) {
      return [
        {
          value: column.Header,
          type: "string"
        }
      ];
    } else {
      const span = [...Array(column.totalVisibleHeaderCount - 1)].map(x => ({
        value: "",
        type: "string"
      }));
      return [
        {
          value: column.Header,
          type: "string"
        },
        ...span
      ];
    }
  }

  export function getExcel(headerGroups, rows) {
    const config = {
      filename: "general-ledger-Q1",
      sheet: {
        data: []
      }
    };

    const dataSet = config.sheet.data;

    // review with one level nested config
    // HEADERS
    headerGroups.forEach(headerGroup => {
      const headerRow = [];
      if (headerGroup.headers) {
        headerGroup.headers.forEach(column => {
          headerRow.push(...getHeader(column));
        });
      }

      dataSet.push(headerRow);
    });

    // FILTERED ROWS
    if (rows.length > 0) {
      rows.forEach(row => {
        const dataRow = [];

        Object.values(row.values).forEach(value =>
          dataRow.push({
            value,
            type: typeof value === "number" ? "number" : "string"
          })
        );

        dataSet.push(dataRow);
      });
    } else {
      dataSet.push([
        {
          value: "No data",
          type: "string"
        }
      ]);
    }
    return generateExcel(config);
  }