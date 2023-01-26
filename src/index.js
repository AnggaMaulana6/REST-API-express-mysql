require ('dotenv').config();
const PORT = process.env.PORT || 5000;
const express = require('express');
const userRoutes = require('./routes/UserRoute.js')
const MiddlewareLogRequest = require('./middlewares/logs');
const upload = require('./middlewares/multer.js');

const app = express();

app.use( MiddlewareLogRequest);
app.use(express.json());
app.use('/assets', express.static('public/images'));
app.use('/users', userRoutes );

// Upload File
app.use('/upload', upload.single('photo'), (req, res) => {
    res.json({
        message: 'Upload Berhasil'
    })
})

app.use((err, req, res, next) => {
    res.json({
        message: err.message
    })
})

app.listen(PORT, () => {
    console.log(`Server Running in Server Port ${PORT}`);
});