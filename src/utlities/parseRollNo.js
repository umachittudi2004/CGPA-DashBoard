export const parseRollNo = (rollNo) => {
    const yearCode = rollNo.slice(0,2)+rollNo.slice(4,6)
    const collageCode = rollNo.slice(2,4);
    const branchCode = rollNo.slice(6,8);

    let year = '';
    let collage = '';
    let branch = '';
    if(yearCode === '221A' || yearCode === '235A') {
        year = '4'
    }
    else if(yearCode === '231A' || yearCode === '245A'){
        year = '3'
    }
    if(branchCode === '44') {
        branch = 'CSE-Data Science';
    }
    else if(branchCode === '42') {
        branch = 'CSE-Artificial Intelligence and Machine Learning';
    }
    else if(branchCode === '05') {
        branch = 'CSE';
    }
    else if(branchCode === "49"){
        branch = 'CSE-Internet of Things';
    }
    else if(branchCode === '12') {
        branch = 'IT';
    }
    else if(branchCode === '04') {
        branch = 'ECE';
    }
    else if(branchCode === '02') {
        branch = 'EEE';
    }
    else if(branchCode === '03') {
        branch = 'MECH';
    }
    else if(branchCode === '01') {
        branch = 'CIVIL';
    }
    if(collageCode === 'P3') {
        collage = 'Aditya College of Engineering and Technology';
    }
    else if(collageCode === 'MH') {
        collage = 'Aditya college of Engineering';
    }
    else if(collageCode === 'A9') {
        collage = 'Aditya Engineering College';
    }
    return {
        year,
        collage,
        branch
    };
}