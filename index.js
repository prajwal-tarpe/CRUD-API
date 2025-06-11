const express = require('express');
const TaskRouter = require('./Routes/TaskRouter')


const app = express();

const PORT = process.env.PORT || 8083;
app.use(express.json());


app.get('/', (req,res) => {
    res.send("Success!!")
})

app.use('/tasks',TaskRouter);

app.listen(PORT, () => {
    console.log(`Server started at PORT: ${PORT}`);
})
