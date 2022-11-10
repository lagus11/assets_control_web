import React from 'react';

export const ColumnFilter = ({ column }) => {

    const { filterValue, setFilter} = column
    return(
        <span>
            <input style={{width: "85%", backgroundColor: "#3498DB" ,border: "0", outline: "none",borderBottom: "1px solid black", color: "black"}} 
                value={filterValue || ''} 
                onChange={(e) => setFilter(e.target.value)}/>
        </span>
    )
}