
use sql3192345;

drop table products;

drop table departments;


CREATE table products (
	item_id integer(11) auto_increment not null,
    product_name varchar(100) not null,
    department_name integer(11) not null,
    price integer(10) not null,
    stock_quantity integer(10) not null,
    product_sales integer(11),
    primary key (item_id)
	);

alter table products
add column product_sales integer(20);

CREATE table departments(
	department_id integer(11) auto_increment not null,
    department_name varchar(30),
    over_head_costs integer default 0,
    primary key(department_id)
);

insert into departments( department_id, department_name, over_head_costs)
values (1,"instruments",5000),
(2,"Computers", 30000),
(3, "Cars", 500000);

select * from departments;

select department_id,departments.department_name , over_head_costs, SUM(product_sales) as total_profit
from departments join products
on departments.department_id = products.department_name
group by departments.department_name;


SELECT department_id, departments.department_name, over_head_costs, Sum(product_sales) as Total_Profit
FROM departments JOIN products ;
ON departments.department_id = products.department_name;

SELECT OrderNumber, TotalAmount, FirstName, LastName, City, Country
  FROM [Order] JOIN Customer
    ON [Order].CustomerId = Customer.Id


insert into products ( product_name, department_name, price, stock_quantity)
values ("Gibson Flying V", "instruments", 400 , 3),
("Gibson Explorer", "instruments", 1600, 2),
("Gibson Les Paul", "instruments",1000, 10),
("Gibson SG", "instruments", 999,20),
("Ibanez JEMJR Steve Vai Signature JEM Series Electric ", "instruments", 499, 6),
("Fender American Standard Stratocaster Electric Guitar", "instruments", 1099, 4),
("Jackson JS32 Rhoads Electric Guitar", "instruments",329, 20),
("PRS Hollowbody II with Piezo Electric Guitar Black Gold Burst", "instruments", 4580, 2),
("Martin Performing Artist Series Custom GPCPA4 Grand Performance Acoustic-Electric Guitar Natural", "instruments", 1899, 5),
("Ernie Ball Music Man John Petrucci Majesty Electric Guitar  Arctic Dream", "instruments", 2949,1);

insert into products ( product_name, department_name, price, stock_quantity, product_sales)
values ("Gibson Flying V", 1,  400 , 3, 200),
("Gibson Explorer", 1,  1600, 2,200),
("Gibson Les Paul", 1, 1000, 10, 200),
("Gibson SG", 1,  999,20, 200),
("Ibanez JEMJR Steve Vai Signature JEM Series Electric ", 1,  499, 6, 200),
("Fender American Standard Stratocaster Electric Guitar", 1,  1099, 4, 200),
("Jackson JS32 Rhoads Electric Guitar", 1, 329, 20, 200),
("PRS Hollowbody II with Piezo Electric Guitar Black Gold Burst", 1,  4580, 2, 200),
("Martin Performing Artist Series Custom GPCPA4 Grand Performance Acoustic-Electric Guitar Natural", 1,  1899, 5, 200),
("Ernie Ball Music Man John Petrucci Majesty Electric Guitar  Arctic Dream", 1,  2949,1, 200);


select * from products;

SELECT products.department_name, departments.department_name,over_head_costs, SUM(product_sales) as Total_Sales
  FROM products JOIN departments;
 GROUP BY departments.department_id;

insert into products ( product_name, department_name, price, stock_quantity, product_sales)
values ("Gibson Flying V", "instruments", 400 , 3,10),
("Gibson Explorer", "instruments", 1600, 2, 10),
("Gibson Les Paul", "instruments",1000, 10, 10),
("Gibson SG", "instruments", 999,20, 10),
("Ibanez JEMJR Steve Vai Signature JEM Series Electric ", "instruments", 499, 6, 10),
("Fender American Standard Stratocaster Electric Guitar", "instruments", 1099, 4, 10),
("Jackson JS32 Rhoads Electric Guitar", "instruments",329, 20, 10),
("PRS Hollowbody II with Piezo Electric Guitar Black Gold Burst", "instruments", 4580, 2, 10),
("Martin Performing Artist Series Custom GPCPA4 Grand Performance Acoustic-Electric Guitar Natural", "instruments", 1899, 5, 10),
("Ernie Ball Music Man John Petrucci Majesty Electric Guitar  Arctic Dream", "instruments", 2949,1, 10);

insert into products ( product_name, department_name, price, stock_quantity, product_sales)
values ("Dell Precision 5520 Series", 2,  1900 , 5, 1900),
("Apple Macbook Pro 15 2017", 2,  2600, 2,200),
("Lenovo ThinkPad T570", 2, 2000, 10, 200),
("ThinkPad X1 Carbon", 2,  1800,20, 200),
("Apple Macbook 2017", 2,  1684, 6, 200),
("Dell XPS 13", 2,  1249, 4, 200);
 
