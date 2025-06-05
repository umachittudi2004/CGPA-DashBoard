import React, { useState } from 'react';
import * as XLSX from "xlsx";
import '../stylings/CgpaList.css'; // Add this line to import styles
import { dataStore } from '../store/useDataStore';
import toast from 'react-hot-toast';
const ExcelInput = () => {
    const setData = dataStore((state) => state.setData);
    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (evt) => {
            const binaryStr = evt.target.result;
            const workbook = XLSX.read(binaryStr, { type: "binary" });

            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];

            const parsedData = XLSX.utils.sheet_to_json(sheet);
            setData(parsedData);
            toast.success("File uploaded successfully!");

        };
        reader.readAsBinaryString(file);

    };

    return (
        <div className="main-container">
            <h2 style={{ fontFamily: 'sans-serif' }} >Upload Excel File</h2>
            <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} 
            style={{
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '8px',
                backgroundColor: '#f9f9f9',
                cursor: 'pointer',
                marginTop: '10px',
                fontSize: '16px'
            }} />
        </div>
    );
};

export default ExcelInput;
