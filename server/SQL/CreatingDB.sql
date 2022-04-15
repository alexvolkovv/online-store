--drop table product_info;
--drop table ordered_product;
--drop table product;
--drop table client_order;
--drop table category;
--drop table status;
--drop table brand;
--drop table client_role cascade;
--drop table client;

create table client_role
(
    id        serial      not null primary key,
    role_name varchar(50) not null unique
);

create table client
(
    id         serial      not null primary key,
    first_name varchar(50) not null,
    last_name  varchar(50) not null,
    email      varchar(50) not null unique,
    password   varchar(20) not null,
    role       int         not null references client_role (id) on delete cascade
);

create table client_order
(
    id           serial      not null primary key,
    client_id    int         not null references client (id) on delete cascade,
    order_date   date        not null,
    price        decimal     not null default 0,
    order_status varchar(50) not null
);

create table status
(
    id          serial      not null primary key,
    status_name varchar(50) not null
);

create table brand
(
    id         serial      not null primary key,
    brand_name varchar(50) not null unique
);

create table category
(
    id            serial      not null primary key,
    category_name varchar(50) not null unique
);


create table product
(
    id           serial      not null primary key,
    article      int         not null unique,
    product_name varchar(50) not null unique,
    price        decimal     not null,
    description  text        not null,
    category_id  int         not null references category (id) on delete cascade,
    brand_id     int         not null references brand (id) on delete cascade
);

create table ordered_product
(
    order_id       int not null references client_order (id) on delete cascade,
    product_id     int not null references product (id) on delete cascade,
    product_count  int not null,
    product_status int not null references status (id) on delete cascade
);

create table product_info
(
    id         serial       not null primary key,
    info_name  varchar(50)  not null,
    info_value varchar(100) not null,
    product_id int          not null references product (id)
);

create table supplier
(
    id            serial      not null primary key,
    supplier_name varchar(50) not null unique,
    phone_number  varchar(12) not null unique
);

create table stock
(
    id         serial      not null primary key,
    stock_name varchar(50) not null unique,
    address    varchar(50) not null
);

create table supply
(
    id            serial  not null primary key,
    product_id    int     not null references product (id) on delete cascade,
    price         decimal not null,
    stock_id      int     not null references stock (id),
    product_count int     not null,
    supply_date   date    not null
);


create table product_supply
(
    supply_id     int     not null references supply (id) on delete cascade,
    product_id    int     not null references product (id) on delete cascade,
    supplier_id   int     not null references supplier (id) on delete cascade,
    price         decimal not null,
    product_count int     not null
);

create table product_stock
(
    id            serial not null primary key,
    stock_id      int    not null references stock (id) on delete cascade,
    product_id    int    not null references product (id) on delete cascade,
    product_count int    not null
);

