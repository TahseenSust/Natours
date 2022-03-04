const express = require('express');
const morgan = require('morgan');

const AppError = require('./utils/appError');
const globalErrorHadler = require('./controllers/errorController')
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

app.use(morgan('dev'));

app.use(express.json());

app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
    //   console.log('hello from middleware');
    next();
});

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// should be in last part of route handler
// app.all('*', (req, res, next) => {
//     // res.status(404).json({
//     //     status: 'fail',
//     //     message: `Cant find ${req.originalUrl} on this server!`,
//     // });
//     // const err = new Error(`Cant find ${req.originalUrl} on this server!`);
//     // err.status = 'fail';
//     // err.statusCode = 404;

//     next(new AppError(`Cant find ${req.originalUrl} on this server!`, 404));
// });

app.use(globalErrorHadler);

module.exports = app;
