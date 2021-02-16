const mysql = require("mysql");
const inquirer = require("inquirer");
const { type } = require("os");

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
  inquirer.prompt([
    {
      type: "list",
      name: "postORbid",
      message: "would you like to post or bid",
      choices: ["POST", "BID"],
    },
  ]);
}
