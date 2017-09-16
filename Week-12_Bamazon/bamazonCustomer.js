var bamazon = {
    init: function() {
        //require all the stuff
        var mysql = require('mysql');
        var con = mysql.createConnection({
            host: "127.0.0.1",
            user: "root",
            password: "rootpassword",
            database: "bamazon_db"
        });
        //pretty table :)
        var Table = require('cli-table');
        var table = new Table({
            chars: {
                'top': '═',
                'top-mid': '╤',
                'top-left': '╔',
                'top-right': '╗',
                'bottom': '═',
                'bottom-mid': '╧',
                'bottom-left': '╚',
                'bottom-right': '╝',
                'left': '║',
                'left-mid': '╟',
                'mid': '─',
                'mid-mid': '┼',
                'right': '║',
                'right-mid': '╢',
                'middle': '│'
            },
            head: ['Item Id', 'Product Name', 'Department', 'Price', 'In Stock'],
            colWidths: [10, 30, 20, 10, 10]
        });
        var inq = require('inquirer');
        //end of requiring stuff
        this.startDb(con); //start db connection
        this.displayProducts(con, table); //show products
        this.initInq(inq, con, table); //ask what they want
    },
    //start db connection
    startDb: function(con) {
        con.connect(function(err) {
            if (err) { throw err; }
            console.log("Connected to Database!");
        });
    },
    //show products
    displayProducts: function(con, table) {
        con.query("SELECT * FROM products", function(err, result, fields) {
            if (err) throw err;
            for (i = 0; i < result.length; i++) {
                var data = result[i];
                table.push([data.item_id, data.product_name, data.department_name, data.price, data.stock_quantity]);
            }
            console.log(table.toString() + "\n\n\n\n");
        });
    },
    //ask what they want
    initInq: function(inq, con, table) {
        inq.prompt([{
            type: "input",
            message: "Which product would you like to purchase?? Please enter an item_id \n\n",
            name: "item"
        }]).then(function(data) {
            //take entry -> make number
            data.item = parseInt(data.item);
            //check if entry is a number
            if (isNaN(data.item) === false) {
                var item = data.item;
                bamazon.initQuant(inq, con, table, item); //now ask how much they want
            }
            //if NaN have user try again
            else {
                console.log("PLEASE ENTER A NUMBER");
                bamazon.initInq(inq, con, table);
            }
        });
    },
    //ask how much they want
    initQuant: function(inq, con, table, item) {
        inq.prompt([{
            type: "input",
            message: "How many would you like to purchase?? Please enter number \n\n",
            name: "count"
        }]).then(function(data) {
            //take entry -> make number
            data.count = parseInt(data.count);
            //check if entry is a number
            if (isNaN(data.count) === false) {
                var quant = parseInt(data.count);
                bamazon.confirmOrder(inq, con, table, item, quant);
            }
            //if NaN have user try again
            else {
                console.log("PLEASE ENTER A NUMBER");
                bamazon.initQuant(inq, con, table);
            }
        });
    },
    //verify order details
    confirmOrder: function(inq, con, table, item, quant) {
        var query = "SELECT product_name, price, stock_quantity FROM products WHERE ?";
        con.query(query, { item_id: item }, function(err, res) {
            var custCost = quant * res[0].price;
            var response = "";
            inq.prompt({
                    name: "confirmOrder",
                    type: "confirm",
                    message: "Please confirm you want to purchase " + quant + " " + res[0].product_name + " for $" + custCost
                })
                .then(function(answer) {
                    if (answer.confirmOrder === true) {
                        if (quant <= res[0].stock_quantity) {
                            response = "\n\nAwesome! We are processing your order!\n.....\n.....\n.....\n.....\n.....\n";
                            var quantNew = res[0].stock_quantity - quant;
                            bamazon.updateDB(con, table, item, quantNew);
                        } else {
                            response = "\n\nSorry, but you've requested more " + res[0].product_name + " than we have available.\n\n";
                            bamazon.stopDb(con);
                        }
                        console.log(response);
                    } else {
                        console.log("\n\nOkay. See ya later");
                        bamazon.stopDb(con);
                    }
                });
        })
    },
    //update the database to reflect confirmed order
    updateDB: function(con, table, item, quantNew) {
        con.query(
            "UPDATE products SET ? WHERE ?", [{
                    stock_quantity: quantNew
                },
                {
                    item_id: item
                }
            ],
            function(err) {
                if (err) throw err;
                console.log("The database has been updated!");
                table.push(["","","","",""]);
                table.push(["the","database","has","been","updated"]);
                table.push(["","","","",""]);
                bamazon.displayProducts(con, table);
            }
        )
       
    },
    //end db connection
    stopDb: function(con) {
        con.end(function(err) {
            if (err) { throw err; }
            console.log("Disconnected from database!\n\n\n\n");
        });
    }
}
//initalize program
bamazon.init();