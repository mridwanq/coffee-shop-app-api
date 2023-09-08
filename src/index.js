require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bearertoken = require('express-bearer-token');
const routes = require('./routes/index');
const db = require('./models');

const PORT = process.env.PORT || 2000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(bearertoken());
// app.use('/users', routes.userRouter);
// app.use('/products', routes.productRouter);
// app.use('/transactions', routes.transactionRouter);

app.get('/test', (req, res) => {
  res.send('welcome my coffee shop API');
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
  //   db.sequelize.sync({ alter: true });
});
