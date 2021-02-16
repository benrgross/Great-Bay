const mysql = require("mysql");
const inquirer = require("inquirer");
const { type } = require("os");
const { bindCallback } = require("rxjs");
const { exit } = require("process");
const util = require('util');


const connection = mysql.createConnection({
  port: 3306,

  user: "root",

  password: "Welcome1",
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
    .then((answer) =>{
      if(answer.postOrBid ==='POST'){post();}
      else if(answer.postOrBid){
        bidAuction();
      }
      else {
        console.log("Goodbye!!!");
      }
      
    });
}


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
