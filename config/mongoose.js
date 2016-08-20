var mongoose = require('mongoose');

module.exports = function (uri) {

    mongoose.connect(uri);

    mongoose.connection.on('connected', function () {
        console.log(`Mongoose conectado em ${uri}`);
    });

    mongoose.connection.on('disconnected', function () {
        console.log(`Mongoose desconectou de ${uri}`);
    });

    mongoose.connection.on('error', function (erro) {
        console.log(`Erro na conexão com Mongoose: ${erro}`);
        process.exit(0);
    });

    //Finalizar a conexão com o mongoose na finalização do sistema
    process.on('SIGINT', function () {
        mongoose.connection.close(function () {
            console.log('Mongoose! Desconectado pelo término da aplicação');

            process.exit(0);
        });
    });

};