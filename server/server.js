const app = require('./app');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const dbLink = process.env.DATABASE_LINK.replace('<username>', process.env.DATABASE_USERNAME)
  .replace('<password>', process.env.DATABASE_PASSWORD)
  .replace('<name>', process.env.DATABASE_NAME);
mongoose
  .connect(dbLink, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('DB connected');
  })
  .catch((err) => {
    console.log(err);
  });
app.listen(process.env.PORT, function (err) {
  if (!err) {
    console.log('app started');
  }
});
