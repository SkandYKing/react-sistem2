import React from 'react';


function TableMain({value, onChangeSort}) {

    const tableMain = [
        {name: '№ заявки', sortProperty: 'id'},
        {name: 'НГДУ', sortProperty: 'ngdu'},
        {name: 'Цех', sortProperty: 'seh'},
        {name: '№ скважины', sortProperty: 'skva'},
        {name: 'Дата', sortProperty: 'date'},
        {name: 'Время', sortProperty: 'time'},
        {name: 'Причина простоя', sortProperty: 'prishina'},
        {name: 'Группа простоев', sortProperty: 'grup'},
        {name: 'Состояние', sortProperty: 'status'},
    ];

    const onClickListItem = (i) =>{
        onChangeSort(i);
    }

    return (    
                <div className="tbl-header">
                    <table cellPadding="0" cellSpacing="0" border="0">
                    <thead>
                        <tr>
                        {
                            tableMain.map((obj, i) => (
                                <th 
                                    key={i} 
                                    onClick={() => onClickListItem(obj)}
                                    className={value.sortProperty === obj.sortProperty ? '' : ' '}>
                                    {obj.name}
                                </th>
                            ))
                        }
                        {/* <th>№ заявки</th>
                        <th>НГДУ</th>
                        <th>цех</th>
                        <th>№ скважины</th>
                        <th>Дата</th>
                        <th>Время</th>
                        <th className="table-td-pr">Причина простоя</th>
                        <th>Группа простоев</th>
                        <th>Состояние</th>
                        <th> </th>
                        <th> </th> */}
                        </tr>
                    </thead>
                    </table>
                </div>
    );
  }
  
export default TableMain;