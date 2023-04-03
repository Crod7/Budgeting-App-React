

const { exec } = require('child_process');

exec('python app.py arg1 arg2', (error, stdout, stderr) => {
  if (error) {
    console.error(`Error executing Python script: ${error}`);
  } else {
    console.log(`Python script output: ${stdout}`);
  }
});


//====================
fetch('http://localhost:5000/')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    data.userName = userName; // add the userName value to the data object
    console.log(data);
  })
  .catch(error => console.error(error));

//===================
