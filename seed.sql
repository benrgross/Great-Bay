Create database greatbaydb;

drop database greatbaydb;

use greatbaydb;

Create database greatbaydb;

drop database greatbaydb;
use greatbaydb;
create table bid (
    id int not null Primary key auto_increment,
    item VARCHAR(30),
    category VARCHAR(45) NOT NULL,
    starting_bid INT default 0,
    highest_bid INT default 0,
    price int 
);

insert into bid (item, category, price) values
("chairs", 2),
("tables", 2),
("lamps", 2);


