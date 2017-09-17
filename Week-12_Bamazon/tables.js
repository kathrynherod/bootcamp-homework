exports.makeTable = {
    //pretty table :)
    Table: require('cli-table'),
    table: new Table({
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
    })
}
exports.sql = {
    mysql: require('mysql'),
    con: mysql.createConnection({
        host: "127.0.0.1",
        user: "root",
        password: "rootpassword",
        database: "bamazon_db"
    })
}