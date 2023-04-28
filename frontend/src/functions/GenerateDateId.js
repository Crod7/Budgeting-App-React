/**
 * This is called throughout the program to give a dateId to a netBalance/ transaction document.
 * It is used to organize database GET requests by month.
 */

export const generateDateId = () => {
    const dateObj = new Date()
    dateObj.toString()
    var currYear = dateObj.getFullYear()
    var currMonth = dateObj.getMonth()
    return Number((currYear+"") + ((currMonth + 1) + ""))
}