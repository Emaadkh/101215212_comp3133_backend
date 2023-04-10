const app = require('./api/index.js');
const dotenv = require('dotenv');

dotenv.config();

app.listen(4000, () => console.log("Server started"));