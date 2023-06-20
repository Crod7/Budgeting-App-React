
// ONLY INCLUDE YOUR SITE AND REMOVE EVERYTHING ELSE
// ALSO, REMOVE !origin FROM whitelist.indexOf() BELOW
// AFTER DEVELOPMENT IS COMPLETE

const allowedOrigins= [
    'htttp://www.yoursite.com', 
    'http://127.0.0.1:5500',
    'http://localhost:5500/', 
    'http://localhost:3000'
]

module.exports = allowedOrigins