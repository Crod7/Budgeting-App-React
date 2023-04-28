/**
 * This is called throughout the program to give a dateId to a netBalance/ transaction document.
 * It is used to organize database GET requests by month.
 * @returns We return a dateId in this format YYYYMM, the current year being the first 4 digits followed by 
 * the 2 digit month.
 */
export const generateDateId = () => {
    const dateObj = new Date()
    dateObj.toString()
    var currYear = dateObj.getFullYear()
    var currMonth = dateObj.getMonth()
    currYear = currYear * 100
    return currYear + (currMonth + 1)
}