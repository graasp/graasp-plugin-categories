CREATE TABLE IF NOT EXISTS category_type (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(20)
);
INSERT INTO category_type (id, name)
VALUES ('3f7b79e2-7e78-4aea-b697-2b6a6ba92e91', 'level'),
    ('c344bf4f-19e0-4674-b2a2-06bb5ac6e11c', 'discipline');
CREATE TABLE IF NOT EXISTS category (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(50),
    type uuid,
    FOREIGN KEY (type) REFERENCES category_type("id") ON DELETE CASCADE
);
INSERT INTO category (name, type)
VALUES (
        'Kindergarden',
        '3f7b79e2-7e78-4aea-b697-2b6a6ba92e91'
    ),
    (
        'Primary School',
        '3f7b79e2-7e78-4aea-b697-2b6a6ba92e91'
    ),
    (
        'Lower Secondary School',
        '3f7b79e2-7e78-4aea-b697-2b6a6ba92e91'
    ),
    (
        'Upper Secondary School',
        '3f7b79e2-7e78-4aea-b697-2b6a6ba92e91'
    ),
    (
        'Vocational Training',
        '3f7b79e2-7e78-4aea-b697-2b6a6ba92e91'
    ),
    (
        'Higher Education',
        '3f7b79e2-7e78-4aea-b697-2b6a6ba92e91'
    ),
    ('Math', 'c344bf4f-19e0-4674-b2a2-06bb5ac6e11c'),
    (
        'Language',
        'c344bf4f-19e0-4674-b2a2-06bb5ac6e11c'
    ),
    (
        'Natural Science',
        'c344bf4f-19e0-4674-b2a2-06bb5ac6e11c'
    ),
    (
        'Social Science',
        'c344bf4f-19e0-4674-b2a2-06bb5ac6e11c'
    ),
    (
        'Literature',
        'c344bf4f-19e0-4674-b2a2-06bb5ac6e11c'
    ),
    ('Arts', 'c344bf4f-19e0-4674-b2a2-06bb5ac6e11c');

-- CREATE item_category table
CREATE TABLE item_category (
    id uuid DEFAULT uuid_generate_v4(),
    item_id uuid,
    category_id uuid,
    PRIMARY KEY(item_id, category_id),
    FOREIGN KEY(item_id) REFERENCES item(id) ON DELETE CASCADE,
    FOREIGN KEY(category_id) REFERENCES category(id) ON DELETE CASCADE
);

-- Add language categories
INSERT INTO category_type (id, name)
VALUES ('34bf2823-480a-4dd7-9c0f-8b5bfbdec380', 'language');

INSERT INTO category (name, type)
VALUES ('English', '34bf2823-480a-4dd7-9c0f-8b5bfbdec380'),
('French', '34bf2823-480a-4dd7-9c0f-8b5bfbdec380'),
('German', '34bf2823-480a-4dd7-9c0f-8b5bfbdec380');