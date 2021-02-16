const mysql = require("mysql");
const inquirer = require("inquirer");
const { type } = require("os");
const { bindCallback } = require("rxjs");
const { exit } = require("process");
const util = require('util');


const connection = mysql.createConnection({
  port: 3306,

  user: "root",
  password: "password",
  database: "greatbaydb",
});
connection.query = util.promisify(connection.query);



function startChoices() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "postOrBid",
        message: "Would you like to post or bid",
        choices: ["POST", "BID", "Exit"],
      },
    ])
<<<<<<< HEAD
    .then((answer) =>{
      if(answer.postOrBid ==='POST'){post();}
      else if(answer.postOrBid){
        bidAuction();
      }
      else {
        console.log("Goodbye!!!");
=======
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
>>>>>>> main
      }
      
    });
}

<<<<<<< HEAD

var post = async() => {
  inquirer.prompt([
    {
      name: "item",
      type: "input",
      message: "Please enter an item for post: ",
    },
    {
      name: "price",
      type: "input",
      message: "How much do you want the price?",
    },
  ]).then(function (input) { 
   connection.query(
    'INSERT into bid SET ?',  
     [ {
        item: input.item,
      },
      {
        price: input.price,
      },
     ],
    function (err){
      if (err) throw err
      console.log('Updating all price...\n');
      console.table(input);
      startChoices();
    }
  )
})
}
var item = [];
var viewItems = async () => {
  console.log('Selecting all items...');
  const res = await connection.query('SELECT * FROM bid');
    for( var i = 0; i < res.length; i++) {
      item.push({value: res[i].id, name: res[i].item +" "+ res[i].price });
      console.log(item);
    }
  console.log(item);
  return item;
};
var  bidAuction = async() => {
  inquirer.prompt([
    {
      name: "item",
      type: "choices",
      message: "Please pick an item to choice from: ",
      choices: await viewItems(),
    },
    {
      name: "price",
      type: "input",
      message: "How much do you want the price?",
    },
  ]).then(function (input) { 
   connection.query(
    'INSERT into bid SET ?',  
     [ {
        item: input.item,
      },
      {
        price: input.price,
      },
     ],
    function (err){
      if (err) throw err
      console.log('Updating all price...\n');
      console.table(input);
      startChoices();
    }
  )
})
}
connection.connect((err) => {
  if (err) throw err;
  console.log(`connected as id ${connection.threadId}\n`);
  startChoices();
});
=======
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
          choices: bidChoices,
        },
        {
          type: "input",
          name: "bidPrice",
          message: "how much do you want to bid",
        },
      ])
      .then(function (data) {
        console.log(res);
        console.log(data);
        let itemID;
        let bidAccept;
        let newPrice = Number(data.price);
        res.forEach((res) => {
          if (data.bidItem === res.item) itemID = res.id;
          if (res.price < Number(data.price)) bidAccept = true;
          else bidAccept = false;
        });
        console.log("bidAccept", bidAccept);

        if (bidAccept === true) {
          const query = connection.query(
            "UPDATE bid SET ? WHERE ?",
            [
              {
                price: newPrice,
              },
              {
                id: itemID,
              },
            ],
            (err, res) => {
              if (err) throw err;
              console.log(`bid of $${newPrice} accepted`);
              startChoices();
            }
          );
        } else {
          console.log(`\n please make a bid higher than ${res.price} \n `);
          viewItems;
        }
      });
  });
}
>>>>>>> main
