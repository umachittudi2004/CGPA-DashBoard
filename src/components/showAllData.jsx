import React from 'react'
import { dataStore } from '../store/useDataStore'
import '../stylings/CgpaList.css';
import { Pagination } from 'react-bootstrap';
import { useState } from 'react';

const showAllData = () => {
    const data = dataStore((state) => state.data);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 100;

    const totalPages = Math.ceil(data.length / itemsPerPage);
    const startIdx = (currentPage - 1) * itemsPerPage;
    const currentData = data.slice(startIdx, startIdx + itemsPerPage);
    const handlePageChange = (page) => setCurrentPage(page);
    return (
        <>
            <div className="student-container">
                {currentData.map((item, index) => (
                    <div className="student-card" key={index}>
                        {
                            item.collage === "Aditya Engineering College" && (
                                <img
                                    src={`https://info.aec.edu.in/AEC/StudentPhotos/${item['Roll.No']}.jpg`}
                                    onError={e => (e.target.src = `${import.meta.env.BASE_URL}4537019.png`)}
                                    alt="student"
                                />
                            )
                        }
                        {
                            item.collage === "Aditya College of Engineering and Technology" && (
                                <img
                                    src={`https://info.aec.edu.in/ACET/StudentPhotos/${item['Roll.No']}.jpg`}
                                    onError={e => (e.target.src = `${import.meta.env.BASE_URL}4537019.png`)}
                                    alt="student"
                                />
                            )
                        }
                        {
                            item.collage === "Aditya college of Engineering" && (
                                <img
                                    src={`https://info.aec.edu.in/ACET/StudentPhotos/${item['Roll.No']}.jpg`}
                                    onError={e => (e.target.src = `${import.meta.env.BASE_URL}4537019.png`)}
                                    alt="student"
                                />
                            )
                        }
                        <h3>{item.year} Year</h3>
                        <p><strong>Roll No:</strong> {item['Roll.No']}</p>
                        {item['Name'] && (
                            <p><strong>Name:</strong> {item['Name']}</p>
                        )}
                        {
                            item['Email'] && (
                                <p> <strong> Email:</strong>  {item['Email']} </p>
                            )
                        }
                        {item['Mobile Number'] && (
                            <p><strong>Mobile Number: </strong> {item['Mobile Number']}</p>
                        )}
                        {/* {
                            item["Gender"] && (
                                <p> <strong>Gender:</strong> {item["Gender"]} </p>
                            )
                        } */}
                        {
                            item["SSC CGPA"] && (
                                <p> <strong>SSC CGPA:</strong> {item["SSC CGPA"].toFixed(2)} </p>
                            )
                        }
                        {
                            item["Inter %"] && (
                                <p> <strong>Inter:</strong> {item["Inter %"]} %</p>
                            )
                        }
                        {
                            item["Diploma"] && (
                                <p> <strong>Diploma %:</strong> {item["Diploma"]} </p>
                            )
                        }
                        {item["BL"] !== undefined && item["BL"] !== null && (
                            <p><strong>Backlog:</strong> {item["BL"] === 0 ? "None" : item["BL"]}</p>
                        )}

                        {
                            item["CGPA"] && (
                                <p><strong>CGPA:</strong> {item["CGPA"]}</p>
                            )
                        }
                        <p><strong>Department:</strong> {item.branch}</p>
                        <p><strong>College:</strong> {item.collage}</p>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            {
                data.length > itemsPerPage && (
                    <>
                        <div className="d-flex justify-content-center mt-4">
                            <Pagination>
                                <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
                                <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />

                                {[...Array(totalPages)].map((_, i) => (
                                    <Pagination.Item
                                        key={i}
                                        active={i + 1 === currentPage}
                                        onClick={() => handlePageChange(i + 1)}
                                    >
                                        {i + 1}
                                    </Pagination.Item>
                                ))}
                                <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
                                <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} />
                            </Pagination>
                        </div>
                    </>
                )
            }
        </>
    )
}

export default showAllData