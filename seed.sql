Create database greatbaydb;

drop database greatbaydb;

create table bid {
    id int Primary key auto_increment not null,
    item VARCHAR(30),
    price int 
};

insert into (item, price) values
("chairs", 2),
("tables", 2),
("lamps", 2);
