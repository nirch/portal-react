import React, { Component } from 'react';
import './itemsTable.css'


class ItemsTable extends Component {
    render() {
        const { items, titles } = this.props;

        const tableTitles = titles.map((title,index) =>
            <th key={index}>{title}</th>
        );

        const tableData = [];
             
        for (var id in items) {
            const tableRow = items[id].map((item, index)=>
                <td key={index} className="itemsTable-data">
                    {item}
                </td>
            );
            
            tableData.push(
            <tr key={id} className="itemsTable-row">
               {tableRow}
            </tr>)
        }

        return (           
                <table  className="itemsTable-table">
                    <thead className="itemsTable-title">
                        <tr>
                            {tableTitles}
                        </tr>
                    </thead>
                    <tbody >                     
                            {tableData}                   
                    </tbody>
                </table>
            
        );
    }
}

export default ItemsTable;