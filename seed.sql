Create database greatbaydb;

drop database greatbaydb;
use greatbaydb;
create table bid (
    id int not null Primary key auto_increment,
    item VARCHAR(30),
    price int 
);

insert into bid (item, price) values
("chairs", 2),
("tables", 2),
("lamps", 2);
