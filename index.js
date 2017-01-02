const express = require('express');

const app = express();

app.get('/todolist', () => {

});

app.listen(3001);
app.use(express.static('./public'));
