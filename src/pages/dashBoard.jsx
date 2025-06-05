import React, { useState } from 'react'
import ExcelInput from '../components/Excelnput'
import { dataStore } from '../store/useDataStore'
import '../stylings/CgpaList.css';
import ShowAllData from '../components/showAllData'
import ShowDataByFilters from '../components/ShowDataByFilter';

const DashBoard = () => {
    const data = dataStore((state) => state.data);
    const [currentPage, setCurrentPage] = useState(0);
    return (
        <>
            <ExcelInput />
            <div className='btn-container'>
                <button className={currentPage===1 ? 'activebtn' : 'btn' } onClick={() => setCurrentPage(1)} >ShowAllData</button>
                <button className={currentPage===2 ? 'activebtn' : 'btn' } onClick={() => setCurrentPage(2)} >ShowDataByFilter</button>
            </div>
            {
                currentPage === 1 && <ShowAllData />
            }
            {
                currentPage === 2 && <ShowDataByFilters data={data} />
            }

        </>
    )
}

export default DashBoard