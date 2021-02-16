const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
  port: 3306,

  user: "root",

  password: "password",
  database: "greatbaydb",
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
    .then(function (data) {
      switch (data.postORbid) {
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

function viewItems() {
  console.log("\n View All Bid Info... \n");
  connection.query("SELECT * FROM bid", (err, res) => {
    if (err) throw err;
    console.table(res);
  });
}

function bid() {
  connection.query("SELECT * FROM bid", (err, res) => {
    if (err) throw err;
    let bidChoices = res.map((res) => res.item);
    console.table(res);

    inquirer
      .prompt([
        {
          type: "list",
          name: "bidItem",
          message: "what would you like to bid on?",
          list: bidChoices,
        },
        {
          type: "input",
          name: "bidPrice",
          message: "how much do you want to bid",
        },
      ])
      .then(function (data) {
        let itemID;
        let bidAccept;
        res.forEach((bid) => {
          if (data.bidItem === res.item) itemID = res.id;
          if (res.price < Number(data.bidPrice)) Accept = true;
          else bidAccept = false;
        });
        console.log("bid accept", bidAccept);
        console.log("itemID", itemID);
      });
  });
}
