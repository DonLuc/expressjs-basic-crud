const express = require('express');
const app = express();
const members = require('./members');
const { engine } = require('express-handlebars');
//NodeJS module to deal with file paths
const path = require('path');

//Handlebars middleware
//app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

const logger = require('./middleware/logger');
//Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Init middleware
app.use(logger);

//Home page route using handlebars
app.get('/', (req, res) =>
  res.render('index', {
    title: 'Testing',
    members: members,
  })
);

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Members API router
app.use('/api/members', require('./routes/api/members'));
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log('Server started on port ' + PORT));
