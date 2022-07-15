const express = require('express');
const app = express();

//NodeJS module to deal with file paths
const path = require('path');

const logger = require('./middleware/logger');
//Body parser middleware

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//Init middleware
app.use(logger);

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Members API router
app.use('/api/members', require('./routes/api/members'));
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log('Server started on port ' + PORT));
