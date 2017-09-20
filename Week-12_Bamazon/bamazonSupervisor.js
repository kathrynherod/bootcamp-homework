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
            choices: ["Set Up Departments", "View Product Sales by Department", "View All Product Sales", "Create New Department", "View Profits", "Exit Application"]
        }]).then(function(data) {
            switch (data.manage) {
                case "Set Up Departments":
                    bamazon.setUpDepartments(inq);
                    break;
                case "View Product Sales by Department":
                    bamazon.departments(inq);
                    break;
                case "View All Product Sales":
                    bamazon.lowInventory(inq);
                    break;
                case "Create New Department":
                    bamazon.addInventory(inq);
                    break;
                case "View Profits":
                    bamazon.addProduct(inq);
                    break;
                default:
                    bamazon.stopDb();
            }
        });
    },
    setUpDepartments: function(inq) {
        //first we need to traverse the table of products to get departments 
        //(I opted not to set these with existing data in case the manager adds 
        //a product and it happens to be in a new/non-existing department)
        sql.con.query("SELECT department_name FROM products", function(err, result, fields) {
            var deptArr = [];
            if (err) throw err;
            for (i = 0; i < result.length; i++) {
                var data = result[i];
                //put all depts into an array
                deptArr.push(data.department_name);
            }
            //clean up the array to delete duplicates
            deptArr = deptArr.slice().sort();
            var deptArrClean = [];
            for (i = 0; i < deptArr.length; i++) {
                if (deptArr[i + 1] == deptArr[i]) {
                    deptArrClean.push(deptArr[i]);
                }
            }
            console.log(deptArrClean);
            //pop these into sql
            bamazon.setOverhead(deptArrClean, inq);
        });
    },
    setOverhead: function(deptArrClean, inq) {
        //put the clean array of dept names into sql
        var tables = require("./tables.js");
        for (i = 0; i < deptArrClean.length; i++) {
            sql.con.query(
                "INSERT INTO departments SET ?", {
                    department_name: deptArrClean[i]
                },
                function(err) {
                    if (err) throw err;
                }
            );
        }
        //show the user the pretty new department table
        sql.con.query("SELECT * FROM departments", function(err, result, fields) {
            if (err) throw err;
            for (i = 0; i < result.length; i++) {
                var data = result[i];
                tables.makeTable.departments.push([data.department_id, data.department_name, "", ""]);
            }
            console.log("Your request has been processed!\n.....\n.....\n.....\n.....\n.....\n");
            console.log("\n\n" + tables.makeTable.departments.toString() + "\n\n\n\n\n\n\n");
            console.log("Great job setting up the departments. Now let's set overhead costs");
        });
        //now get the user to set overhead costs
        sql.con.query("SELECT * FROM departments", function(err, result, fields) {
            if (err) throw err;
            var overheadArr = [];
            for (i = 0; i < result.length; i++) {
                var data = result[i];
                inq.prompt(
                        [{
                            name: "deptOverhead",
                            message: "\nEnter the overhead costs for the " + data.department_name + " Department:\n"
                        }]
                    )
                    .then(function(data) {
                        overheadArr.push(data.deptOverhead);
                    });
            }
            console.log(overheadArr)
        });
    },
    departments: function() {

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