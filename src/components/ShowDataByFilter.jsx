import React, { useState, useEffect } from 'react';
import '../stylings/FilterCards.css'; // We'll define the styles here
import '../stylings/CgpaList.css';
const ShowDataByFilters = ({ data }) => {
    const uniqueYears = [...new Set(data.map(d => d.year).filter(Boolean))];
    const uniqueBranches = [...new Set(data.map(d => d.branch).filter(Boolean))];
    const uniqueColleges = [...new Set(data.map(d => d.collage).filter(Boolean))];
    const uniqueGenders = [...new Set(data.map(d => d["Gender"]).filter(Boolean))];
    const genderExists = data.some(d => d["Gender"]);
    const CGPAExits = data.some(d => d["CGPA"]);
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedBranch, setSelectedBranch] = useState('');
    const [selectedCollege, setSelectedCollege] = useState('');
    const [rollSearch, setRollSearch] = useState('');
    const [nameSearch, setNameSearch] = useState('');
    const [selectedGender, setSelectedGender] = useState('');
    const [cgpaComparison, setCgpaComparison] = useState('');
    const [cgpaValue, setCgpaValue] = useState('');


    const [filteredData, setFilteredData] = useState(data);

    useEffect(() => {
        let filtered = data;
        if (selectedYear) filtered = filtered.filter(item => item.year === selectedYear);
        if (selectedBranch) filtered = filtered.filter(item => item.branch === selectedBranch);
        if (selectedCollege) filtered = filtered.filter(item => item.collage === selectedCollege);
        if (selectedGender) filtered = filtered.filter(item => item["Gender"] === selectedGender);
        if (rollSearch) {
            filtered = filtered.filter(item => item['Roll.No']?.toLowerCase().includes(rollSearch.toLowerCase()));
        }
        if (nameSearch) {
            filtered = filtered.filter(item => item['Name']?.toLowerCase().includes(nameSearch.toLowerCase()));
        }
        if (cgpaComparison && cgpaValue) {
            const cgpaNum = parseFloat(cgpaValue);
            if (!isNaN(cgpaNum)) {
                if (cgpaComparison === 'gt') {
                    filtered = filtered.filter(item => parseFloat(item["CGPA"]) > cgpaNum);
                } else if (cgpaComparison === 'lt') {
                    filtered = filtered.filter(item => parseFloat(item["CGPA"]) < cgpaNum);
                }
            }
        }
        setFilteredData(filtered);
    }, [selectedYear, selectedBranch, selectedGender, selectedCollege, rollSearch, data, nameSearch, cgpaComparison, cgpaValue]);

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

                {genderExists && (
                    <select value={selectedGender} onChange={e => setSelectedGender(e.target.value)}>
                        <option value="">All Genders</option>
                        {uniqueGenders.map(gender => (
                            <option key={gender} value={gender}>{gender}</option>
                        ))}
                    </select>
                )}

                {
                    CGPAExits && (
                        <div className="cgpa-filter">
                            <select value={cgpaComparison} onChange={e => setCgpaComparison(e.target.value)}>
                                <option value="">CGPA Filter</option>
                                <option value="gt">Greater Than</option>
                                <option value="lt">Less Than</option>
                            </select>

                            <input
                                type="number"
                                placeholder="Enter CGPA"
                                value={cgpaValue}
                                onChange={e => setCgpaValue(e.target.value)}
                                min="0"
                                max="10"
                                step="0.01"
                            />
                        </div>

                    )
                }


                <input
                    type="text"
                    placeholder="Search by Roll Number"
                    className="roll-search"
                    value={rollSearch}
                    onChange={e => setRollSearch(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Search by Name"
                    className="name-search"
                    value={nameSearch}
                    onChange={e => setNameSearch(e.target.value)}
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
                            {
                                item["Gender"] && (
                                    <p> <strong>Gender:</strong> {item["Gender"]} </p>
                                )
                            }
                            {
                                item["SSC CGPA"] && (
                                    <p> <strong>SSC CGPA:</strong> {item["SSC CGPA"].toFixed(2)} </p>
                                )
                            }
                            {
                                item["Inter %"] && (
                                    <p> <strong>Inter:</strong> {item["Inter %"]}% </p>
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
                    ))
                )}
            </div>
        </div>
    );
};

export default ShowDataByFilters;
