const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(db, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        })

        console.log(`Connected to Database: ${connection.connection.host}`)
    } catch (error) {
        console.error(`Error: ${error.message}`)
        process.exit(1)
    }
}

module.exports = connectDB