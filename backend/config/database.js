const mongoose = require('mongoose')


const connectDatabase = () => {
     mongoose.connect(process.env.DB_LOCAL_URI, ({


    })).then(con => {
        console.log('database connected ')
    })
}

module.exports = connectDatabase;