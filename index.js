var inquirer = require('inquirer');
var mysql = require('mysql');
var Table = require("terminal-table");
var color = require("colors");
var term = require('terminal-kit').terminal;

var connection = mysql.createConnection({
  host     : 'sql3.freesqldatabase.com',
  user     : 'sql3192345',
  password : 'DIFqsH1ITd',
  database : 'sql3192345'
});

dbConnect();
// mainMenu();

manager();
//
// var  app = process.argv[2];
//
// switch(app){
//   case "order":
//     placeAOrder();
//     break;
//   case "manage":
//     manager();
//     break;
//   case "supervisor":
//     supervisor();
//     break;
//   default:
//     manager();
// }

function mainMenu(){

    console.log("hello");
    var options = {
  	y: 1 ,	// the menu will be on the top of the terminal
  	style: term.inverse ,
  	selectedStyle: term.dim.blue.bgGreen,
    continueOnSubmit: false
  } ;
  var items = [ 'Place Order' , 'Products For Sale' , 'Low Inventory' , 'Add Inventory' , 'Add New Product' , 'Supervisor' ];

  // term.clear() ;
  // term.grabInput( { mouse: 'button' } ) ;
  // term.on( 'mouse' , function( name , data ) {
  //   console.log( "'mouse' event:" , name , data ) ;
  //   }
  // ) ;

  term.singleLineMenu( items , options , function( error , response ) {
    if (error) throw error;
    console.log("response from term " + response.selectedIndex);
      switch(response.selectedIndex.toString()){
        case "0":
          placeAOrder();
          break;
        case "1":
          viewProductsForSale();
          break;
        case "2":
          viewLowInventory();
          break;
        case "3":
          addInventory();
          break;
        case "4":
          addNewProduct();
          break;
        case "5":
          supervisor();
          break;
        case "6":
          exitProgram();
          break;
        default:
          manager();
      }
    });
}

// ########################
//supervisor Logic
// ########################
function supervisor(){

  console.log(
    "\n\rMenu Options:\n\r"+
    "1 View Products for Sale\n\r" +
    "2 Create new department\n\r"+
    "3 Exit program"
  );
  inquirer.prompt([{
    name: "option",
    message: "Please enter the number"
  }]).then(function(answers){
    if(answers.option == 1){
      console.log("You are no in View Product Sales");
      viewProductSales();
    } else if (answers.option == 2){
      createNewDepartment();
    }
  });

}

function viewProductSales() {
  var salesQuery = "select department_id,departments.department_name , over_head_costs, SUM(product_sales) as total_profit from departments join products on departments.department_id = products.department_name group by departments.department_name;";
  connection.query(salesQuery, function(error, results, field) {
    if (error) throw error;
    var t = new Table({
      borderStyle: 2
    });

    t.push(["Department ID".blue, "Department Name".blue, "Over Head Costs".blue, "Total Profit".blue], ["---------", "----------", "---------", "---------"]);

    for (var i = 0; i < results.length; i++) {
      t.push(
        [results[i].department_id, results[i].department_name, results[i].over_head_costs, results[i].total_profit]
      )
    }

    console.log("" + t);

    supervisor();

  });
}

function createNewDepartment (){
  var newDep = {};
  inquirer.prompt([{
    name:'id',
    message: 'Please Enter department ID'
  },{
    name:'name',
    message: 'Please Enter Department Name'
  },{
    name:'overhead',
    message:'Please enter over head cost for the department'
  }]).then(function(answers){
    newDep.department_id = answers.id;
    newDep.department_name = answers.name;
    newDep.over_head_costs = answers.overhead;
    connection.query(
      'insert into departments set ?', newDep,
      function(error, results, fields){
        if (error) throw error;
        console.log(results);
      }
    );
  });
}

// ########################
// Manager Logic
// ########################
function manager (){
  console.log(
    "\n\rMenu Options:\n\r"+
    "1 View Products for Sale\n\r" +
    "2 View Low Inventory\n\r"+
    "3 Add Inventory\n\r" +
    "4 Add New Product\n\r" +
    "5 Supervisor\n\r" +
    "6 Exit program"
  );

  inquirer.prompt([{
    name:"app",
    message: "Please enter the number associated with the options"
  }]).then(function(answers){

    switch(answers.app){
      case "1":
        viewProductsForSale();
        break;
      case "2":
        viewLowInventory();
        break;
      case "3":
        addInventory();
        break;
      case "4":
        addNewProduct();
        break;
      case "5":
        supervisor();
        break;
      case "6":
        exitProgram();
        break;
    }
  });
}

function viewProductsForSale(){
  connection.query(
    'select * from products',
    function(error, results, fields){
      if(error) throw error;
      var t = new Table({
        borderStyle:2
      });

      // console.log(results.length);

      t.push(["Item ID".blue, "Product".blue, "Price".blue, "Qty in Stock".blue],
      ["---------","----------","---------","---------"]);

      for(var i = 0; i < results.length; i++){
        t.push(
          [results[i].item_id, results[i].product_name, results[i].price,results[i].stock_quantity]
        )
      }

      console.log("" + t);
      //
      // mainMenu();
      manager();
    }
  );
}

function viewLowInventory(){
  connection.query(
    'select * from products where stock_quantity<=5',
    function(error, results, fields){
      if(error) throw error;
      var t = new Table({
        borderStyle:2
      });

      // console.log(results.length);

      t.push(["---------","Low Stock","---------"],
        ["Item ID".blue, "Product".blue, "Price".blue, "Qty in Stock".blue],
      ["---------","----------","---------","---------"]);

      for(var i = 0; i < results.length; i++){
        t.push(
          [results[i].item_id, results[i].product_name, results[i].price,results[i].stock_quantity]
        )
      }

      console.log("" + t);
      // mainMenu();
      manager();
    }
  );



}

function addInventory(){
  inquirer.prompt([{
    name:"id",
    message:"Please Enter Id for item you would like to Add"
  }]).then(function(answers){
    connection.query('select * from products where item_id =' +
    answers.id ,
    function(error, results, fields){
      if(error) throw error;

      inquirer.prompt([{
        name:'qty',
        message: "How many would you like to add to inventory"
      }]).then(function(answers){
        var itemPrimary = results[0].item_id;
        var total = parseInt(results[0].stock_quantity) + parseInt(answers.qty);
        var totalRev = parseInt(results[0].product_sales) + parseInt(total);


        connection.query('update products set stock_quantity =' + total + ", product_sales ="+ totalRev +" where item_id=" + results[0].item_id,
          function(error, results, fields){

            connection.query(
              'select * from products where item_id=' + itemPrimary,
              function(error, results, fields){
                if(error) throw error;

                // mainMenu();
                manager();

              }
          );
        });
      });
    }
  )
  });
}

function addNewProduct(){
  var newProduct = {};
  inquirer.prompt([{
    name:'name',
    message: 'Please Enter Product Name'
  },{
    name:'dep',
    message: 'Please Enter Department Name'
  },{
    name:'price',
    message:'Price of new Product'
  },{
    name:'qty',
    message:'How many will you like to add to inventory'
  }]).then(function(answers){
    newProduct.product_name = answers.name;
    newProduct.department_name = answers.dep;
    newProduct.price = answers.price;
    newProduct.stock_quantity = answers.qty;
    connection.query(
      'insert into products set ?', newProduct,
      function(error, results, fields){
        if (error) throw error;
        console.log(results);
        // mainMenu();
        manager();
      }
    )
  });
}

function exitProgram(){
  connection.end(function(err) {
    if (err) throw error;
    // The connection is terminated now
    console.log("Connection Terminated");
  });
}

// ########################
// Place A Order Logic
// ########################

function placeAOrder (){
  connection.query(
    'select * from products',
    function(error, results, fields){
    if(error) throw error;

    var t = new Table({
      borderStyle:2
    });

    // console.log(results.length);

    t.push(["Item ID".blue, "Product".blue, "Price".blue, "Qty in Stock".blue],
    ["---------","----------","---------","---------"]);

    for(var i = 0; i < results.length; i++){
      t.push(
        [results[i].item_id, results[i].product_name, results[i].price,results[i].stock_quantity]
      )
    }

    console.log("" + t);

    userInput();

  });
}

function userInput () {
  inquirer.prompt([
    {
      name: "id",
      message: "Please Select an ID number corresponding to the item you would like to purchase"
    }, {
      name: "qty",
      message: "Please enter the quantity you would like to purchase"
    }

  ]).then(function(answers) {

    console.log("You requested item# " + answers.id + "\n\r and you would like to purchase " + answers.qty +"  item/items");

    availability(answers.id, answers.qty);

  });

}

function availability (id, qty) {
  connection.query(
    'select * from products where item_id =' + id,
    function(error, results, fields){
      if(error) throw error;

      var instock = results[0].stock_quantity;
      var sales = results[0].product_sales;

      console.log("this many in stock " + instock);

      if( instock >= qty){
        console.log("We have the quanity of item/items you requested in stock");
        var price = results[0].price;
        var total = price * qty;
        console.log("Your total cost is " + total + " Thank you for your money have a nice day");
        var newQty = instock - qty;
        var totalSales = parseInt(sales) + parseInt(total);

        placeOrder(newQty,id, totalSales);

      } else {

        if(instock === 0 ){
          console.log("Sorry we are out of stock");
          // mainMenu();
          manager();
        } else {

          var item = results[0].product_name;
          console.log(
            "Sorry you currently requested " + qty + " " + item +
            "'s and we currently only have " + instock + " in stock"
          );
          manager();
          // mainMenu();
        }
      }
  });
}

function placeOrder(newQty, id , total){
  connection.query(
    'update products set stock_quantity =' + newQty + ", product_sales= "+ total +" where item_id=" + id,
    function(error, results, fields){
      if (error) throw error;
      console.log( results);
      // mainMenu();
      manager();
    });

}

// ########################
//Database connection Logic
// ########################

function dbConnect () {
  connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }

    console.log('connected as id ' + connection.threadId);

  });
}
