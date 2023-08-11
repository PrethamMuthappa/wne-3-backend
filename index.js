// import required packages

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const morgan = require('morgan');
const corsOptions = {origin:process.env.ALLOW_ORIGIN}
const dbConnect = require('./config/db');
const cookieParser = require('cookie-parser');
// create instance for express
const app = express();

// database connection
dbConnect();


// all routes
const routes = require('./routes');
const { notFound, errorHandler } = require('./middlewares/errorHandler');


app.use(morgan('dev'));
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())
app.use(routes);

// middlewares
app.use(notFound);
app.use(errorHandler);

// run server
app.listen(process.env.PORT || 4000,()=>{
    console.log(`Server is running at PORT ${process.env.PORT}`)
});
