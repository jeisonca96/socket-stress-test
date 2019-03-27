/**
 * 
 */


const io = require('socket.io-client'),
    colyseus = require('colyseus.js'),
    argv = require('./config/yargs').argv,
    cli = require('cli'),
    date = require('date-and-time')

let getInfo = () => {

    try {
        let type_socket = argv.type
        let host_socket = argv.host
        let connections_socket = argv.connections

        let timeInitial = new Date()

        switch (type_socket) {
            case "io":
                ioConnection(connections_socket, host_socket)
                
                var timeFinal = new Date()
                var subTime = date.subtract(timeFinal, timeInitial).toMilliseconds();

                console.log(`End ${connections_socket} conections in ${type_socket} in ${subTime} Milliseconds`)

                break

            case "colyseus":
                colyseusConnection(connections_socket, host_socket)

                var timeFinal = new Date()
                var subTime = date.subtract(timeFinal, timeInitial).toMilliseconds();

                console.log(`End ${connections_socket} conections in ${type_socket} in ${subTime} Milliseconds`)

                break

            default:
                break
        }
    } catch (error) {
        console.log(error)
    }
}

let ioConnection =  (connections_socket, host_socket) => {
    for (let i = 1; i <= connections_socket; i++) {
        var socket = io(host_socket)
        socket.on('connect', function () {
            var msg = 'Conectado io'
            cli.debug(`Connection #${i}: ${msg}`)
        });
        socket.on('event', function (data) { })
        socket.on('disconnect', function () {
            var msg = 'Desconectado io'
            cli.debug(`Connection #${i}: ${msg}`)
        })
    }
}

let colyseusConnection = (connections_socket, host_socket) => {
    for (let i = 1; i <= connections_socket; i++) {
        var client = new colyseus.Client(host_socket)
        var room = client.join("ParkesColombiano", {
            uID: "YpUtf5q5BRjjVJN2",
            nickname: "ELMASTER"
        });

        var msg = 'Conectado colyseus'
        cli.debug(`Connection #${i}: ${msg}`)
        // room.onJoin.add(() => {
        // });
    }
}

// Ejecutar
getInfo()