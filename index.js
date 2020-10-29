const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const properties = require('./backend/config/properties');
const db = require('./backend/config/database');
const routes = require('./backend/_routes/routes');
const router = express.Router();

db()

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Error handling
app.use((req, res, next) => {
     res.setHeader("Access-Control-Allow-Origin", "*");
     res.setHeader("Access-Control-Allow-Credentials", "true");
     res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
     res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Origin, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization");
   next();
 });

//make sure all of below, including router comes after app.use(bodyParser)
 require('./backend/_models/models');
 //can use regular routes below (same as see 2)
 // require('./backend/musicians/musicians.routes')(app);

// use express router
//can also use /api/musicians per below
// app.use('/api', router);
//(2)or regular routes per below
app.use(router);
//call musician routing
routes(router);

// intialize server
app.listen(properties.PORT, (req, res) => {
    console.log(`Server is running on ${properties.PORT} port.`);
})

//OLD
// const port = process.env.PORT || 3001;
//
// app.get('/', ((req, res) => {
//   res.send('Hello You\n');
// }))
//
// app.listen(port)
