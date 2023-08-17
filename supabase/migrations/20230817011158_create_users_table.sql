CREATE TABLE  users (
    id uuid references auth.users on delete cascade not null primary key,
    name varchar(30) unique not null,
    email text not null
);
