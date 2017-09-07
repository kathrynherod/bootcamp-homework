var mysql = require('mysql');

//make console pretty
var Table = require('cli-table');
var table = new Table({
	chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
         , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
         , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
         , 'right': '║' , 'right-mid': '╢' , 'middle': '│' },
	head: ['Item Id', 'Product Name', 'Department', 'Price', 'In Stock'],
	colWidths: [10, 30,20,10,10]
});

//db credentials
var con: mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "rootpassword",
    database: "bamazon_db"
});

//connect to the db
con.connect(function(err) {
    if (err) { throw err; }
    console.log("Connected!");

});

//spit out the data
con.query("SELECT * FROM products", function (err, result, fields) {
    if (err) throw err;

    for (i=0;i<result.length;i++) {
    	
    	var data = result[i];
    	table.push([data.item_id, data.product_name, data.department_name, data.price,data.stock_quantity]);
    }
    
    console.log(table.toString());
  });

//end db connection
con.end(function(err) {
    if (err) { throw err; }
    console.log("Disconnected!");
});
