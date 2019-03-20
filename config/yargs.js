/**
 * Config
 */

const argv = require('yargs').options({
    type: {
        alias: 't',
        desc: 'Type connection (Socket.io: io, Colyseus: colyseus)',
        demand: true
    },
    host: {
        alias: 'h',
        desc: 'Host connection',
        demand: true
    },
    connections: {
        alias: 'c',
        desc: 'Number connections',
        demand: true
    }
}).argv;

module.exports = {
    argv
}