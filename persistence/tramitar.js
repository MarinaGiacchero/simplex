/**
 * @author: Helen de Freitas Santos
 * @author: Marina Giacchero
 * @date: 07/02/2022
 * @desc: methods for fetching mysql data
*/
//methods for fetching mysql data

var globals    = require('../models/global.js');
var persistence;
var DataBase   = require('../models/database.js');
var dataBase   = new DataBase();

 function TramitarPersistence() {

    this.getPersistence = 
    function () {    
          return new Promise(function (resolve, reject) {
              if   (globals.dataBaseType == 1) {
                    var Persistence = require('./relational/tramitar.js');
                    var persistence = new Persistence();
                    resolve(persistence);
                  }
              else if   (globals.dataBaseType == 2) {
                  /*firebase ainda não possui o model personagem*/
                          var Persistence = require('./firebase/tramitar.js');          
                          var persistence = new Persistence();
                          resolve(persistence);
                  }
                   else {
                       reject();
                   }
        }); 
    };

    this.getPersistence()
        .then((data) => {
            persistence = data;
        });

    // get all objects data 
    this.getAll = function (res) {
        dataBase.getDataBase(globals.dataBaseType)
        .then((db) => {
            persistence.getAll(db, res);
        });
    };

    // get object by id
    this.getById = function (id, res) {
        dataBase.getDataBase(globals.dataBaseType)
        .then((db) => {
            persistence.getById(db, id, res);
        });
    };

    this.getLast = async function (res) {
       let objeto
        await dataBase.getDataBase(globals.dataBaseType)
        .then((db) => {
            objeto= persistence.getLast(db, res);
           
        });
     return objeto;
    };

    this.getAtt = async function (offset, res) {
        let objeto
         await dataBase.getDataBase(globals.dataBaseType)
         .then((db) => {
             objeto= persistence.getAtt(db, offset, res);
            
         });
      return objeto;
     };

    this.add = async function (object, res) {
       await dataBase.getDataBase(globals.dataBaseType)
        .then((db) => {    
            persistence.add(db, object, res);
        });
    };


    this.update = function (object, res) {
        dataBase.getDataBase(globals.dataBaseType)
        .then((db) => {    
            persistence.update(db, object, res);
        });
    };


    this.deleteById = async function (id, res) {
        await dataBase.getDataBase(globals.dataBaseType)
        .then((db) => {    
            persistence.deleteById(db, id, res);
        });
    };

}

module.exports = TramitarPersistence;
