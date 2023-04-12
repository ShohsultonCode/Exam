CREATE DATABASE exam;



CREATE TABLE todolist(
    todo_id SERIAL PRIMARY KEY NOT NULL,
    todo_title VARCHAR(255) NOT NULL,
    todo_created_at timestamp without time zone default current_timestamp not null,
    isDeleted boolean NOT NULL default false,
    isDone boolean NOT NULL default false
);



