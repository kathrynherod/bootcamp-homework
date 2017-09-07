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
values ('MacBook Pro', 'Electronics', 2000, 10);
INSERT INTO products (product_name, department_name, price, stock_quantity) 
values ('iPhone 7', 'Electronics', 900, 45);
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


