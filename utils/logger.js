// import pkg from "winston";
// const { createLogger, format, transports } = pkg;
// import path from "path";

// const getLabel = function(callingModule) {
//     const parts = callingModule.filename.split(path.sep);
//     console.log(path.join(parts[parts.length - 2], parts.pop()));
//   return path.join(parts[parts.length - 2], parts.pop());
// };


// export default createLogger({
// transports:
//     new transports.File({
//     filename: 'logs/server.log',
//     format:format.combine(
//         format.timestamp({format: 'MMM-DD-YYYY HH:mm:ss'}),
//         format.align(),
//         format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`),
//     )}),
// });
// // // // const level = process.env.NODE_LOGGING_LEVEL || "info";
// // // // export default createLogger({
// // // //   name: "myapp",
// // // //   streams: [
// // // //     {
// // // //       level,
// // // //       stream: process.stdout
// // // //     },
// // // //     {
// // // //       level,
// // // //       path: path.resolve(__dirname, "..", "..", "server.log")
// // // //     }
// // // //   ]
// // // // });


// // import winston from 'winston';
// // var getLabel = function (callingModule) {
// //     var parts = callingModule.filename.split('/');
// //     return parts[parts.length - 2] + '/' + parts.pop();
// // };

// // const logger =  function (callingModule) {
// //     return new winston.Logger({
// //         transports: [
// //             new winston.transports.Console({
// //                 label: getLabel(callingModule),
// //                 json: false,
// //                 timestamp: true,
// //                 depth:true,
// //                 colorize:true
// //             })
// //         ]
// //     });
// // };

// // export {logger}


import winston from 'winston';

const options = {
    file: {
        level: 'info',
        filename: './logs/app.log',
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: false,
    }
}

const logger = winston.createLogger({
    levels: winston.config.npm.levels,
    
    transports: [
        new winston.transports.File(options.file),
    ],
    exitOnError: false
})

export default logger;