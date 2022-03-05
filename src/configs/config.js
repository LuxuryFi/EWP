require('dotenv').config();

module.exports = {
    port: process.env.PORT || 3001,
    mysqlSettings: {
        database: process.env.DB_DATABASE,
        user: process.env.DB_USERNAME || 'root',
        // password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST || '127.0.0.1',
        port: process.env.DB_PORT || 3306
    },
    rabbitMqSettings: {
        consumerUri: process.env.CONSUMER_MQ_SERVER_URI || 'amqp://localhost',
        producerUri: process.env.PRODUCER_MQ_SERVER_URI || 'amqp://localhost',
    },
    cls: {
        // HTTP Correlation Header from ApiGateway
        correlationIdHeader: 'Microservices-Correlation-ID',
        // name of cls namespace
        correlationIdNamespace: 'cls-correlation-id',
        // name of the variable on the cls namespace
        correlationIdName: 'cls-correlation-id',
    },
    jwt: {
        publicKey: process.env.PUBLIC_KEY,
        algorithm: 'RS256',
    },
    mongoSettings: {
        db: process.env.DB_MONGO_NAME,
        user: process.env.DB_MONGO_USERNAME,
        password: process.env.DB_MONGO_PASSWORD,
        server: process.env.DB_MONGO_HOSTNAME || '127.0.0.1:27017',
    },
    ws: {
        port: 2021,

    }
}
