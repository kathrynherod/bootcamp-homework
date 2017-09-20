var mysql = require('mysql');
var sql = {
    con: mysql.createConnection({
        host: "127.0.0.1",
        user: "root",
        password: "rootpassword",
        database: "bamazon_db"
    })
}

var bamazon = {
    init: function() {
        //require all the stuff
        var inq = require('inquirer');
        //end of requiring stuff
        this.startDb(); //start db connection
        //this.displayProducts(); //show products
        this.initInq(inq); //ask what they want
    },
    //start db connection
    startDb: function() {
        sql.con.connect(function(err) {
            if (err) { throw err; }
            console.log("Connected to Database!");
        });
    },
    //ask what they want
    initInq: function(inq) {
        inq.prompt([{
            name: "manage",
            type: "rawlist",
            message: "\n\n What would you like to do?",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Exit Program"]
        }]).then(function(data) {
            switch (data.manage) {
                case "View Products for Sale":
                    bamazon.displayProducts(inq);
                    break;
                case "View Low Inventory":
                    bamazon.lowInventory(inq);
                    break;
                case "Add to Inventory":
                    bamazon.addInventory(inq);
                    break;
                case "Add New Product":
                    bamazon.addProduct(inq);
                    break;
                default:
                    bamazon.stopDb();
            }
        });
    },
    //show products
    displayProducts: function(inq) {
        //pull cli export
        var tables = require("./tables.js");
        tables.makeTable.prodList.splice(0);
        sql.con.query("SELECT * FROM products", function(err, result, fields) {
            if (err) throw err;
            for (i = 0; i < result.length; i++) {
                var data = result[i];
                tables.makeTable.prodList.push([data.item_id, data.product_name, data.department_name, data.price, data.stock_quantity]);
            }
            console.log("\n\n" + tables.makeTable.prodList.toString() + "\n\n\n\n\n\n\n");
            console.log("Press any key to continue");
        });
        bamazon.initInq(inq);
    },
    //display and query low inventory items
    lowInventory: function(inq) {
        var tables = require("./tables.js");
        tables.makeTable.lowInv.splice(0);
        var query = "SELECT * FROM products";
        sql.con.query(query, function(err, res) {
            if (err) throw err;
            for (i = 0; i < res.length; i++) {
                var data = res[i];
                if (data.stock_quantity < 5) {
                    tables.makeTable.lowInv.push([data.item_id, data.product_name, data.department_name, data.price, data.stock_quantity]);
                }
            }
            console.log("\n\n" + tables.makeTable.lowInv.toString() + "\n\n\n\n\n\n\n");
            console.log("Press any key to continue");
        })
        bamazon.initInq(inq);
    },
    //add inventory/stock to db
    addInventory: function(inq) {
        var tables = require("./tables.js");
        tables.makeTable.prodList.splice(0);
        sql.con.query("SELECT * FROM products", function(err, result, fields) {
            if (err) throw err;
            for (i = 0; i < result.length; i++) {
                var data = result[i];
                tables.makeTable.prodList.push([data.item_id, data.product_name, data.department_name, data.price, data.stock_quantity]);
            }
            console.log("\n\n" + tables.makeTable.prodList.toString() + "\n\n\n\n\n\n\n");
            console.log("Press any key to continue");
        });
        inq.prompt([{
            type: "choices",
            message: "For which product would you like to adjust the inventory? Please enter an item_id \n\n",
            name: "item"
        }]).then(function(data) {
            //take entry -> make number
            data.item = parseInt(data.item);
            //check if entry is a number
            if (isNaN(data.item) === false) {
                var item = data.item;
                bamazon.initQuant(inq, item)
            }
            //if NaN have user try again
            else {
                console.log("PLEASE ENTER A NUMBER");
                bamazon.addInventory(inq);
            }
        });
    },
    //add a product to db
    addProduct: function(inq) {
        inq.prompt([{
                name: "itemName",
                message: "\nEnter the product name:\n"
            }, {
                name: "dept",
                message: "\nEnter the name of the department:\n"
            }, {
                name: "price",
                message: "\nEnter the price of the item:\n"
            }, {
                name: "stock",
                message: "\nHow many of these items are in stock?\n"
            }])
            .then(function(data) {
                sql.con.query(
                    "INSERT INTO products SET ?", {
                        product_name: data.itemName,
                        department_name: data.dept,
                        price: data.price,
                        stock_quantity: data.stock
                    },
                    function(err) {
                        if (err) throw err;
                        console.log("Your request has been processed!\n.....\n.....\n.....\n.....\n.....\n");
                        var tables = require("./tables.js");
                        tables.makeTable.prodList.splice(0);
                        sql.con.query("SELECT * FROM products", function(err, result, fields) {
                            if (err) throw err;
                            for (i = 0; i < result.length; i++) {
                                var data = result[i];
                                tables.makeTable.prodList.push([data.item_id, data.product_name, data.department_name, data.price, data.stock_quantity]);
                            }
                            console.log("\n\n" + tables.makeTable.prodList.toString() + "\n\n\n\n\n\n\n");
                            console.log("Press any key to continue");
                        });
                        bamazon.initInq(inq);
                    }
                );
            });
    },
    //ask how much they want
    initQuant: function(inq, item) {
        inq.prompt([{
            type: "input",
            message: "How many units would you like to add? Please enter number \n\n",
            name: "count"
        }]).then(function(data) {
            //take entry -> make number
            data.count = parseInt(data.count);
            //check if entry is a number
            if (isNaN(data.count) === false) {
                var quant = parseInt(data.count);
                bamazon.confirmInventoryOrder(inq, item, quant);
            }
            //if NaN have user try again
            else {
                console.log("PLEASE ENTER A NUMBER");
                bamazon.initQuant(inq, item);
            }
        });
    },
    //verify inventory add details
    confirmInventoryOrder: function(inq, item, quant) {
        var query = "SELECT * FROM products WHERE ?";
        sql.con.query(query, { item_id: item }, function(err, res) {
            inq.prompt({
                    name: "confirmOrder",
                    type: "confirm",
                    message: "Please confirm you want to add " + quant + " " + res[0].product_name + " to the inventory."
                })
                .then(function(answer) {
                    if (answer.confirmOrder === true) {
                        console.log("\n\nAwesome! We are processing your request!\n.....\n.....\n.....\n.....\n.....\n");
                        var quantNew = res[0].stock_quantity + quant;
                        var prodName = res[0].product_name;
                        bamazon.createOrder(inq, item, prodName, quant, quantNew);
                        bamazon.updateDB(inq, item, quantNew);
                    }
                })
        })
    },
    //spit the request into the db
    createOrder: function(inq, item, prodName, quant, quantNew) {
        sql.con.query(
            "INSERT INTO inventory_log SET ?", {
                item_id: item,
                product_name: prodName,
                current_stock: quantNew - quant,
                quantity_added: quant,
                updated_stock: quantNew
            },
            function(err) {
                if (err) throw err;
                console.log("Your request has been processed!\n.....\n.....\n.....\n.....\n.....\n");
                var tables = require("./tables.js");
                sql.con.query("SELECT * FROM inventory_log", function(err, result, fields) {
                    if (err) throw err;
                    for (i = 0; i < result.length; i++) {
                        var data = result[i];
                        tables.makeTable.inventoryLog.push([data.log_id, data.item_id, data.product_name, data.current_stock, data.quantity_added, data.updated_stock]);
                    }
                    tables.makeTable.prodList.push(["item", "inventories", "have", "been", "updated"]);
                    console.log("\n\n" + tables.makeTable.inventoryLog.toString() + "\n\n\n\n\n\n\n");
                    console.log("Press any key to continue");

                });
            }
        );
    },
    //update the database to reflect confirmed order
    updateDB: function(inq, item, quantNew) {
        sql.con.query(
            "UPDATE products SET ? WHERE ?", [
                { stock_quantity: quantNew },
                { item_id: item }
            ],
            function(err) {
                if (err) throw err;
                console.log("The database has been updated!\n.....\n.....\n.....\n.....\n.....\n");
                bamazon.initInq(inq, item);
            }
        )
    },
    //end db connection
    stopDb: function() {
        sql.con.end(function(err) {
            if (err) { throw err; }
            console.log("Disconnected from database!\n.....\n.....\n.....\n.....\n.....\n");
        });
    }
}
//initalize program
bamazon.init();