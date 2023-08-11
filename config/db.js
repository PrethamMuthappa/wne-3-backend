const mongoose = require('mongoose');


const dbConnect = () => {
    try {
        mongoose.connect(process.env.DB_URL);
        console.log('Database connected!!!')
    } catch (error) {
        console.log(`Database error: ${error}`)
    }
}

module.exports = dbConnect