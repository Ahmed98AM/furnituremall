const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cors = require('cors');

const billsRouter = require('./routes/billsRoutes');
const productsRouter = require('./routes/productsRoutes');
const billProductsRouter = require('./routes/billProductsRoutes');
const viewRouter = require('./routes/viewRoutes');
const globalErrorHandler = require('./controllers/errorController');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(cors());

// Index Route
app.get('/', function (req, res) {
  res.render('index.ejs');
});
app.use('/api/bills', billsRouter);
app.use('/api/products', productsRouter);
app.use('/api/billProducts', billProductsRouter);
app.use('/', viewRouter);
app.use(globalErrorHandler);
module.exports = app;
