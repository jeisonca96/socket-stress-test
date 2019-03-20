/**
 * 
 */


const io = require('socket.io-client'),
    colyseus = require('colyseus.js'),
    argv = require('./config/yargs').argv,
    cli = require('cli')

let getInfo = async (socket) => {

    try {
        let type_socket = argv.type
        let host_socket = argv.host
        let connections_socket = argv.connections

        let time = (new Date()).getTime()

        switch (type_socket) {
            case "io":

                for (let i = 1; i <= connections_socket; i++) {
                    var socket = io(host_socket)
                    socket.on('connect', function () {
                        var msg = 'Conectado io'
                        cli.debug(`Connection #${i}: ${msg}`)
                    });
                    socket.on('event', function (data) { })
                    socket.on('disconnect', function () {
                        console.log('Desconectado io')
                    });
                }

                break

            case "colyseus":
                for (let i = 1; i <= connections_socket; i++) {
                    var client = new colyseus.Client(host_socket)
                    var room = client.join("ParkesColombiano", {
                        uID: "YpUtf5q5BRjjVJN2",
                        nickname: "ELMASTER"
                    });
                    var msg = 'Conectado colyseus'
                    cli.debug(`Connection #${i}: ${msg}`)

                    // room.onJoin.add(function () {
                    //     console.log(client.id, "joined", room.name);
                    // });
                }
                break

            default:
                break
        }

        return "info"

    } catch (error) {
        console.log(error)
    }
}

getInfo().then(result => console.log(result)).catch((err) => console.log(err))