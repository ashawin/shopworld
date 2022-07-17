const app = require('./app');
const dotenv = require('dotenv');
const { path } = require('./app');


const connectDatabase = require('./config/database');

dotenv.config({ path: 'backend/config/config.env' });

process.on('uncaughtException', err => {
    console.log(`Error: ${err.stack}`);
    console.log('Shutting down the server due to uncaught exception');
    process.exit(1);

})

connectDatabase();
const server = app.listen(process.env.PORT, () => {
    console.log(`app started on port ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
})

process.on('unhandledRejection', err => {
    console.log(`Error: ${err.message}`);
    console.log('Shutting down the server duw unhandle promise rejection');
    server.close(() => {
        process.exit(1);
    })
})
