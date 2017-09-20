DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;

CREATE TABLE products (
  item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price INTEGER(11) NOT NULL,
  stock_quantity INTEGER(11) NOT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
values ('MacBook Pro', 'Electronics', 2000, 3);
INSERT INTO products (product_name, department_name, price, stock_quantity) 
values ('iPhone X', 'Electronics', 1200, 1);
INSERT INTO products (product_name, department_name, price, stock_quantity) 
values ('Rocketbook', 'Office Supplies', 30, 100);
INSERT INTO products (product_name, department_name, price, stock_quantity) 
values ('Brother Color Printer Ink', 'Office Supplies', 70, 200);
INSERT INTO products (product_name, department_name, price, stock_quantity) 
values ('Longhorn Tumbler', 'Household', 20, 5);
INSERT INTO products (product_name, department_name, price, stock_quantity) 
values ('Wusthoff Classic Chef Knife', 'Household', 150, 15);
INSERT INTO products (product_name, department_name, price, stock_quantity) 
values ('Longhorn Hoodie', 'Clothing', 50, 20);
INSERT INTO products (product_name, department_name, price, stock_quantity) 
values ('Bistro Crocs', 'Clothing', 40, 45);
INSERT INTO products (product_name, department_name, price, stock_quantity) 
values ('Kong Indestructible Ball', 'Pets', 20, 50);
INSERT INTO products (product_name, department_name, price, stock_quantity) 
values ('Cow Hooves', 'Pets', 10, 450);

CREATE TABLE orders (
  order_id INTEGER(11) AUTO_INCREMENT NOT NULL,
  item_id INTEGER(11) NOT NULL,
  product_name VARCHAR(100) NOT NULL,
  quantity INTEGER(11) NOT NULL,
  total_price INTEGER(11) NOT NULL,
  remaining_stock INTEGER(11) NOT NULL,
  PRIMARY KEY (order_id)
);

CREATE TABLE inventory_log (
  log_id INTEGER(11) AUTO_INCREMENT NOT NULL,
  item_id INTEGER(11) NOT NULL,
  product_name VARCHAR(100) NOT NULL,
  current_stock INTEGER(11) NOT NULL,
  quantity_added INTEGER(11) NOT NULL,
  updated_stock INTEGER(11) NOT NULL,
  PRIMARY KEY (log_id)
);
