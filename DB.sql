USE sql_intro;
drop table pokemon_trainer;
drop table pokemon;
drop table trainer;
DROP TABLE town ;
DROP TABLE pokemon_type ;

CREATE TABLE pokemon_type(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    typename VARCHAR(20)
);

CREATE TABLE town(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(20)
);

CREATE TABLE trainer(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(25),
    town int,
    FOREIGN KEY(town) REFERENCES town(id)
);


CREATE TABLE pokemon(
    id INT NOT NULL  PRIMARY KEY,
    name VARCHAR(20),
    typename int,
    height int,
    weight int,
    -- ownedBy int,
    FOREIGN KEY(typename) REFERENCES pokemon_type(id)
    -- FOREIGN KEY(ownedBy) REFERENCES trainer(id)
);

create table pokemon_trainer (
    pokemon_id int,
    trainer_id int,
    FOREIGN KEY(pokemon_id) REFERENCES pokemon(id),
    FOREIGN KEY(trainer_id) REFERENCES trainer(id)
);