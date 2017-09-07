var bamazon = {

    init: function() {

        var mysql = require('mysql');
        var con = mysql.createConnection({
            host: "127.0.0.1",
            user: "root",
            password: "rootpassword",
            database: "bamazon_db"
        });
        this.startDb(con);
        this.displayProducts(con);
        this.initInq();

    },
    startDb: function(con) {
        con.connect(function(err) {
            if (err) { throw err; }
            console.log("Connected!");

        });
    },
    displayProducts: function(con) {
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
        con.query("SELECT * FROM products", function(err, result, fields) {
            if (err) throw err;

            for (i = 0; i < result.length; i++) {
                var data = result[i];
                table.push([data.item_id, data.product_name, data.department_name, data.price, data.stock_quantity]);
            }
            console.log(table.toString() + "\n\n\n\n\n");
        });
    },
    initInq: function() {
        var inq = require('inquirer');
        inq.prompt([{
            type: "input",
            message: "\n\nWhich product would you like to purchase?? Please enter an item_id \n\n",
            name: "item"
        }]).then(function(data) {
        	//take entry -> make number
            data.item = parseInt(data.item);
            //check if entry is a number
            if (isNaN(data.item) === false) {
                console.log(data.item);
                bamazon.initQuant(inq);
            } 
            //if NaN have user try again
            else {
                console.log("PLEASE ENTER A NUMBER");
                bamazon.initInq();
            }
        });
    },
    initQuant: function(inq) {
    	inq.prompt([{
            type: "input",
            message: "\n\nHow many would you like to purchase?? Please enter number \n\n",
            name: "count"
        }]).then(function(data) {
        	//take entry -> make number
            data.count = parseInt(data.count);
            //check if entry is a number
            if (isNaN(data.count) === false) {
                console.log(data.count);
                
            } 
            //if NaN have user try again
            else {
                console.log("PLEASE ENTER A NUMBER");
                bamazon.initQuant(inq);
            }
        });
    },
    stopDb: function(con) {
        con.end(function(err) {
            if (err) { throw err; }
            console.log("Disconnected!");
        });
    }
}
bamazon.init();