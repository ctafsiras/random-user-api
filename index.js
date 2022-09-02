const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const userRoutes = require('./routes/user.route');

app.use(express.json())
app.use('/user', userRoutes);
app.get('/', (req, res) => {
    res.send("Hello Bhai")
})

app.listen(port, () => {
    console.log('Server is running on port: ', port);
})