const express =  require('express'); 
const cors = require('cors');
const port = process.env.PORT || 3000;
const app = express();
// middleware
app.use(cors());
app.use(express.json());

// routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});