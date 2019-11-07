import React, { Component } from 'react';
import { Table } from 'react-bootstrap'


class ItemsTable extends Component {
    render() {
        const { items, titles } = this.props;

        const tableTitles = titles.map((title,index) =>
            <th key={index}>{title}</th>
        );

        const tableData = [];
       
             
        for (var id in items) {
            const tableRow = items[id].map(item=>
                <td>
                    {item}
                </td>
            );
            console.log(tableRow)

            tableData.push(
            <tr key={id}>
               {tableRow}
            </tr>)
        }

        return (
            
                <Table responsive="sm">
                    <thead>
                        <tr>
                            {tableTitles}
                        </tr>
                    </thead>
                    <tbody>
                        
                            {tableData}
                       
                    </tbody>
                </Table>
            
        );
    }
}

export default ItemsTable;