import React, { useState, useEffect } from 'react';
import '../stylings/FilterCards.css'; // We'll define the styles here
import '../stylings/CgpaList.css';
const ShowDataByFilters = ({ data }) => {
    const uniqueYears = [...new Set(data.map(d => d.year).filter(Boolean))];
    const uniqueBranches = [...new Set(data.map(d => d.branch).filter(Boolean))];
    const uniqueColleges = [...new Set(data.map(d => d.collage).filter(Boolean))];

    const [selectedYear, setSelectedYear] = useState('');
    const [selectedBranch, setSelectedBranch] = useState('');
    const [selectedCollege, setSelectedCollege] = useState('');
    const [rollSearch, setRollSearch] = useState('');

    const [filteredData, setFilteredData] = useState(data);

    useEffect(() => {
        let filtered = data;

        if (selectedYear) filtered = filtered.filter(item => item.year === selectedYear);
        if (selectedBranch) filtered = filtered.filter(item => item.branch === selectedBranch);
        if (selectedCollege) filtered = filtered.filter(item => item.collage === selectedCollege);
        if (rollSearch) {
            filtered = filtered.filter(item => item['Roll.No']?.toLowerCase().includes(rollSearch.toLowerCase()));
        }

        setFilteredData(filtered);
    }, [selectedYear, selectedBranch, selectedCollege, rollSearch, data]);

    return (
        <div className="filter-container">
            <h2>Filter Students</h2>
            <div className="dropdowns">
                <select value={selectedYear} onChange={e => setSelectedYear(e.target.value)}>
                    <option value="">All Years</option>
                    {uniqueYears.map(year => (
                        <option key={year} value={year}>{year}</option>
                    ))}
                </select>

                <select value={selectedBranch} onChange={e => setSelectedBranch(e.target.value)}>
                    <option value="">All Branches</option>
                    {uniqueBranches.map(branch => (
                        <option key={branch} value={branch}>{branch}</option>
                    ))}
                </select>

                <select value={selectedCollege} className='select' onChange={e => setSelectedCollege(e.target.value)}>
                    <option value="">All Colleges</option>
                    {uniqueColleges.map(college => (
                        <option key={college} value={college}>{college}</option>
                    ))}
                </select>
                <input
                    type="text"
                    placeholder="Search by Roll Number"
                    className="roll-search"
                    value={rollSearch}
                    onChange={e => setRollSearch(e.target.value)}
                />
            </div>


            <hr />
            <h3>Filtered Students ({filteredData.length})</h3>
            <div className="student-container">
                {filteredData.length === 0 ? (
                    <p>No matching records found.</p>
                ) : (
                    filteredData.map((item, idx) => (
                        <div key={idx} className="student-card">
                            <img
                                src={`https://info.aec.edu.in/ACET/StudentPhotos/${item['Roll.No']}.jpg`}
                                onError={e => (e.target.src = `${import.meta.env.BASE_URL}4537019.png`)}
                                alt="Student"
                            />
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
                            <p><strong>CGPA:</strong> {item['CGPA']}</p>
                            <p><strong>Department:</strong> {item.branch}</p>
                            <p><strong>College:</strong> {item.collage}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ShowDataByFilters;
