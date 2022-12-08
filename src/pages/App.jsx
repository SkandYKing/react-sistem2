import React from 'react';
import TableMain from '../components/TableMain';
import Table from '../components/Table';
import Categories from '../components/Categories';
import Create from '../components/Create';
import Editing from '../components/Editing';
import Search from '../components/Search';
import Pagination from '../components/Pagination';


// const table = [
//     { name1: '1', name2: 'АН', name3: '3', name4: '49', name5: '04/03/2022', name6: '14:00', name7: 'Исслед.герметичности э/ж', name8: 'Исслед.до КРС', name9: 'Ошибка'},
//     { name1: '2', name2: 'АН', name3: '3', name4: '49', name5: '11/10/2022', name6: '10:30', name7: 'Освоение после ПРС', name8: 'Освоение', name9: 'В работе'},
//     { name1: '3', name2: 'АН', name3: '5', name4: '83Н', name5: '06/05/2022', name6: '09:30', name7: 'Ожидание ГТМ при КРС', name8: 'Геолог. ограничен.', name9: 'Исправленна'},
//     { name1: '4', name2: 'АН', name3: '5', name4: '85', name5: '05/04/2022', name6: '08:00', name7: 'Ожидание исследованний при ТРС', name8: 'Геолог. ограничен', name9: 'Ошибка'},
//     { name1: '5', name2: 'АН', name3: '4', name4: '100', name5: '06/10/2022', name6: '12:45', name7: 'Освоение после ПРС', name8: 'Освоение', name9: 'Ошибка'},
//     { name1: '6', name2: 'АН', name3: '4', name4: '101', name5: '19/10/2022', name6: '05:30', name7: 'Освоение после ПРС', name8: 'Освоение', name9: 'В работе'},
//     { name1: '7', name2: 'АН', name3: '3', name4: '49', name5: '04/03/2022', name6: '14:00', name7: 'Исслед.герметичности э/ж', name8: 'Исслед.до КРС', name9: 'В работе'},
//     { name1: '8', name2: 'АН', name3: '3', name4: '49', name5: '11/10/2022', name6: '10:30', name7: 'Освоение после ПРС', name8: 'Освоение', name9: 'Исправленна'},
// ];

const App = () => {
    const [createOpened, setCreateOpened] = React.useState(false);
    const [editingOpened, setEditingOpened] = React.useState(false);
    const [searchValue, setSearchValue] = React.useState('');
    const [currentPage, onChangePage] = React.useState(1);



    const [items, setItems] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [categoryId, setCategoryId] = React.useState(0);
    const [sortType, setSortType] = React.useState({
        name: 'Цех',
        sortProperty: 'seh',
    });
    
    
    React.useEffect(() => {
        setIsLoading(true);

        const sortBy = sortType.sortProperty
        const order = sortType.name.includes('asc') ? 'desc' : 'asc';

        fetch(
            `https://638a87c57220b45d227e7bb5.mockapi.io/table?page=${currentPage}&limit=8&${
            categoryId > 0 ? `category=${categoryId}` : ''
        }&sortBy=${sortBy}&order=${order}`,
        )
            .then((res) => res.json())
            .then((arr) =>{
                setItems(arr);
                setIsLoading(false);
            });
            window.scrollTo(0, 0);
    }, [categoryId, sortType, currentPage]);

    return (
        <>
        {createOpened ? <Create onClose={() => setCreateOpened(false)}/> : null}
        {editingOpened ? <Editing onClose={() => setEditingOpened(false)}/> : null}
                <div className="item-grid2">
                    <div className="sort">
                        <div className="inputDate">
                            <h5>Период:</h5>
                            <input type="date"/>
                            <input type="date"/>
                        </div>
                        <div onClick={() => setCreateOpened(true)} className="inputButton search-block2 ">
                            <img height={20} width={20} src='img/plus.png' alt='+'/>
                            <input type="button" value='Создать'/>
                        </div>
                    </div>
                    <div className="contentBLock">
                        <Categories value={categoryId} onClickCategory={(i) => setCategoryId(i)}/>
                        <Search searchValue={searchValue} setSearchValue={setSearchValue}/>
                    </div>
                </div>
                <div className="item-grid1 contentBLock mb-40">
                </div>
                <section className="item-grid2">
                <div className="item-scroll">
                {/* <div className="tbl-header">
                    <table cellPadding="0" cellSpacing="0" border="0">
                    <thead>
                        <tr>
                        <th>№ заявки</th>
                        <th>НГДУ</th>
                        <th>Цех</th>
                        <th>№ скважины</th>
                        <th>Дата</th>
                        <th>Время</th>
                        <th>Причина простоя</th>
                        <th>Группа простоев</th>
                        </tr>
                    </thead>
                    </table>
                </div> */}
                <TableMain value={sortType} onChangeSort={(i) => setSortType(i)}/>
                        {items
                        .filter(obj => {
                            if (obj.ngdu.toLowerCase().includes(searchValue.toLowerCase())){
                                return true;
                            }
                                return false;
                        })
                        .map((obj, index) => (
                            <Table 
                            key={index} 
                            id={obj.id}
                            ngdu={obj.ngdu}
                            seh={obj.seh}
                            skva={obj.skva}
                            date={obj.date}
                            time={obj.time}
                            prishina={obj.prishina}
                            grup={obj.grup}
                            status={obj.status}
                            setEditingOpened={setEditingOpened}
                            />
                        ))}
                </div>
                <Pagination currentPage={currentPage} onChangePage={onChangePage} />
                </section>
                </>
    )
}
export default App;