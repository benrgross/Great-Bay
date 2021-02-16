const mysql = require("mysql");
const inquirer = require("inquirer");
const { type } = require("os");
const { bindCallback } = require("rxjs");
const { exit } = require("process");

const connection = mysql.createConnection({
  port: 3306,

  user: "root",

  password: "password",
  database: "greatbayDB",
});

connection.connect((err) => {
  if (err) throw err;
  console.log(`connected as id ${connection.threadId}\n`);
  startChoices();
});

function startChoices() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "postORbid",
        message: "would you like to post or bid",
        choices: ["POST", "BID", "View Items", "Exit"],
      },
    ])
    .then(function () {
      switch (data) {
        case "POST":
          post();
          break;
        case "BID":
          bid();
          break;
        case "View Items":
          viewItems();
          break;
        case "Exit":
          exit();
          break;
      }
    });
}

function viewItems() {}
