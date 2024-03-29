/**
 * @author: Helen de Freitas Santos
 * @author: Marina Giacchero
 * @date: 01/04/2022
 * @desc: custom route for fetching data
*/

module.exports = {
    //set up route configuration that will be handle by express server
    configure: function (app) {
        //custom route for fetching data
        var Controller = require('../controller/materia');
       // const passport = require('passport');
        var controller = new Controller();

        // adding route for object, here app is express instance which provide use
        // get method for handling get request from http server. 
        app.get('/rest/materias', function (req, res) {
       //     const index = req.rawHeaders.indexOf('Authorization')
            controller.getAll(res, req);
        });

        app.get('/rest/materias/ano', function (req, res) {
            //     const index = req.rawHeaders.indexOf('Authorization')
                 controller.getMateriaAno(res, req);
             });

        // here we gets id from request and passing to it object method.
        app.get('/rest/materia/:id/', function (req, res) {
            controller.getById(res, req);
        });

        // here we insert an object.
        app.post('/rest/materia', function (req, res) {

            controller.add(req, res);
        });

        // here we update an object.
        app.put('/rest/materia',  function (req, res) {
            controller.update(req, res);
        });

        // here we delete an object passing id to it object method.
        app.delete('/rest/materia/:id', function (req, res) {
            controller.deleteById(req.params.id, res);
        });
    }

};