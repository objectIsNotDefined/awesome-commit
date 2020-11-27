"use strict";

const inquirer = require('inquirer');

const queryForm = async param => {
  return new Promise(resolve => {
    inquirer.prompt(param).then(answer => {
      resolve(answer);
    }).catch(error => {
      resolve(false);
    });
  });
};

module.exports = queryForm;