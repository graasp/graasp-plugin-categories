CREATE TABLE IF NOT EXISTS category_types (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(20)
);
INSERT INTO category_types (name)
VALUES ('age'),
    ('discipline');
CREATE TABLE IF NOT EXISTS all_categories (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(50),
    type uuid,
    FOREIGN KEY (type) REFERENCES category_types("id") ON DELETE CASCADE
);
INSERT INTO all_categories (name, type)
VALUES (
        'pre-school',
        '3f7b79e2-7e78-4aea-b697-2b6a6ba92e91'
    ),
    (
        'grade-1-to-8',
        '3f7b79e2-7e78-4aea-b697-2b6a6ba92e91'
    ),
    (
        'high-school',
        '3f7b79e2-7e78-4aea-b697-2b6a6ba92e91'
    ),
    (
        'college',
        '3f7b79e2-7e78-4aea-b697-2b6a6ba92e91'
    ),
    ('math', 'c344bf4f-19e0-4674-b2a2-06bb5ac6e11c'),
    (
        'language',
        'c344bf4f-19e0-4674-b2a2-06bb5ac6e11c'
    ),
    (
        'natural-science',
        'c344bf4f-19e0-4674-b2a2-06bb5ac6e11c'
    ),
    (
        'social-science',
        'c344bf4f-19e0-4674-b2a2-06bb5ac6e11c'
    ),
    (
        'literature',
        'c344bf4f-19e0-4674-b2a2-06bb5ac6e11c'
    ),
    ('art', 'c344bf4f-19e0-4674-b2a2-06bb5ac6e11c');

-- CREATE item_category table
CREATE TABLE item_category (
    item_id uuid,
    category uuid,
    PRIMARY KEY(item_id, category),
    FOREIGN KEY(item_id) REFERENCES item(id) ON DELETE CASCADE,
    FOREIGN KEY(category) REFERENCES all_categories(id) ON DELETE CASCADE
);