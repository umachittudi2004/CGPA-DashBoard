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
        branch = 'Data Science';
    }
    else if(branchCode === '42') {
        branch = 'Aiml';
    }
    if(collageCode === 'P3') {
        collage = 'Aditya College of Engineering and Technology';
    }
    else if(collageCode === 'MH') {
        collage = 'Aditya college of Engineering';
    }
    return {
        year,
        collage,
        branch
    };
}