import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import doctorsRouter from './routes/doctorsRoutes';
import reportsRouter from './routes/reportRoutes';

dotenv.config();
var app = express();

mongoose.connect(process.env.DATABASE_URL!, {family: 4}).then(() =>{
  console.log('Database connected succesfully')
}).catch(error => {
  console.log(error)
});

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

app.use('/doctor', doctorsRouter);
app.use('/report', reportsRouter);

const port = 5000
app.listen(port, ()=>{
    console.log(`Server running on port ${port}...`)
}) 

export default app;
