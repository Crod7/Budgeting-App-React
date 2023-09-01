## Getting Started, Setting up on local machine

First, clone the repo.  
    The folder cloned is called "OnlineDatabaseGui".  
    Inside the folder there are two more folders inside it called 'frontend' and 'backend'.  

Next, open the cloned repo in your code editor(Visual Studio Code) and install dependencies.  

Inside the code editor open up the terminal and navigate to the frontend directory.  
`cd frontend`  
then install the dependencies  
`npm install`  
Next, open a new terminal and navigate to the backend directory.  
`cd backend`  
then install the dependencies  
`npm install`  

Finally, create a `.env` file inside the backend folder.  
    Enter the following information or your own `MongoDB_URI` and `SECRET`.  
    `PORT=5500`  
    `MONGO_URI=mongodb+srv://admin:admin@bdgtdb.oqc9a6e.mongodb.net/?retryWrites=true&w=majority`  
    `SECRET=ye1y072ey7201ey9y18ey98uhew71h9e8w9h11`  


## Opening on local host  

You will need to open up two terminals. In the first terminal navigate to the backend folder and run the following  
    `npm run start`  
    You should recieve a console log message displaying `listening on port 5500`.  

Next, open up the frontend in the second terminal.  
    In the second terminal run  
    `npm run build`  
    followed by  
    `npm run start`  

The application should be up and running.  

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.  



## Check out the deployment on Vercel  

Link to deployment [https://budgetingreactapp.onrender.com/](https://budgetingreactapp.onrender.com/).  

