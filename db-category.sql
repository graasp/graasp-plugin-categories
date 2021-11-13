CREATE TABLE category_age (
    id serial PRIMARY KEY,
    category_name VARCHAR(50) UNIQUE NOT NULL
);
INSERT INTO category_age (name)
VALUES ('PreSchool'),
    ('Grade1to8'),
    ('HighSchool'),
    ('College');
CREATE TABLE category_discipline (
    id serial PRIMARY KEY,
    discipline_name VARCHAR(50) UNIQUE NOT NULL
);
INSERT INTO category_discipline (name)
VALUES ('Math'),
    ('Literature'),
    ('Natural Science'),
    ('Social Science'),
    ('Languages');