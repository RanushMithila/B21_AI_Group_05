DROP TABLE IF EXISTS inventory;
DROP TABLE IF EXISTS sales;
DROP TABLE IF EXISTS plants;
DROP TABLE IF EXISTS categories;

-- Create tables
CREATE TABLE IF NOT EXISTS categories (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(10) NOT NULL,
    parent_id BIGINT,
    FOREIGN KEY (parent_id) REFERENCES categories(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS plants (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(25) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    quantity INT NOT NULL,
    category_id BIGINT,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS sales (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    plant_id BIGINT NOT NULL,
    quantity INT NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    sold_at DATETIME(6),
    FOREIGN KEY (plant_id) REFERENCES plants(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS inventory (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    plant_id BIGINT NOT NULL,
    quantity INT NOT NULL CHECK (quantity >= 1),
    type ENUM('IN', 'OUT') NOT NULL,
    note VARCHAR(255),
    created_at DATETIME(6),
    FOREIGN KEY (plant_id) REFERENCES plants(id) ON DELETE CASCADE
);

-- Seed categories (names 3-10 chars per SRS validation rules)
INSERT INTO categories (name, parent_id) VALUES ('Indoor', NULL);
INSERT INTO categories (name, parent_id) VALUES ('Outdoor', NULL);
INSERT INTO categories (name, parent_id) VALUES ('Cacti', 1);
INSERT INTO categories (name, parent_id) VALUES ('Bonsai', 1);
INSERT INTO categories (name, parent_id) VALUES ('Palms', 1);
INSERT INTO categories (name, parent_id) VALUES ('Herbs', 2);
INSERT INTO categories (name, parent_id) VALUES ('Climbers', 2);
INSERT INTO categories (name, parent_id) VALUES ('Aquatic', 2);

-- Seed plants (names 3-25 chars, price > 0, quantity >= 0, sub-categories only)
INSERT INTO plants (name, price, quantity, category_id) VALUES ('Golden Barrel Cactus', 12.50, 45, 3);
INSERT INTO plants (name, price, quantity, category_id) VALUES ('Bunny Ear Cactus', 9.75, 30, 3);
INSERT INTO plants (name, price, quantity, category_id) VALUES ('Juniper Bonsai', 55.00, 12, 4);
INSERT INTO plants (name, price, quantity, category_id) VALUES ('Chinese Elm Bonsai', 65.00, 8, 4);
INSERT INTO plants (name, price, quantity, category_id) VALUES ('Areca Palm', 35.00, 25, 5);
INSERT INTO plants (name, price, quantity, category_id) VALUES ('Basil', 4.50, 120, 6);
INSERT INTO plants (name, price, quantity, category_id) VALUES ('Mint', 3.99, 150, 6);
INSERT INTO plants (name, price, quantity, category_id) VALUES ('Rosemary', 6.25, 3, 6);
INSERT INTO plants (name, price, quantity, category_id) VALUES ('Jasmine', 18.00, 40, 7);
INSERT INTO plants (name, price, quantity, category_id) VALUES ('Money Plant', 14.50, 70, 7);
INSERT INTO plants (name, price, quantity, category_id) VALUES ('Water Lily', 28.00, 20, 8);
INSERT INTO plants (name, price, quantity, category_id) VALUES ('Lotus', 32.50, 0, 8);

-- Seed sales (total_price = plant price x quantity)
INSERT INTO sales (plant_id, quantity, total_price, sold_at) VALUES (1, 2, 25.00, '2026-06-01 09:15:00');
INSERT INTO sales (plant_id, quantity, total_price, sold_at) VALUES (3, 1, 55.00, '2026-06-01 11:30:00');
INSERT INTO sales (plant_id, quantity, total_price, sold_at) VALUES (6, 10, 45.00, '2026-06-02 10:00:00');
INSERT INTO sales (plant_id, quantity, total_price, sold_at) VALUES (7, 8, 31.92, '2026-06-02 14:20:00');
INSERT INTO sales (plant_id, quantity, total_price, sold_at) VALUES (9, 3, 54.00, '2026-06-03 09:45:00');
INSERT INTO sales (plant_id, quantity, total_price, sold_at) VALUES (10, 5, 72.50, '2026-06-03 16:10:00');
INSERT INTO sales (plant_id, quantity, total_price, sold_at) VALUES (5, 2, 70.00, '2026-06-04 10:30:00');
INSERT INTO sales (plant_id, quantity, total_price, sold_at) VALUES (2, 4, 39.00, '2026-06-04 15:00:00');
INSERT INTO sales (plant_id, quantity, total_price, sold_at) VALUES (11, 1, 28.00, '2026-06-05 11:05:00');
INSERT INTO sales (plant_id, quantity, total_price, sold_at) VALUES (4, 1, 65.00, '2026-06-05 13:40:00');
INSERT INTO sales (plant_id, quantity, total_price, sold_at) VALUES (6, 6, 27.00, '2026-06-06 09:25:00');
INSERT INTO sales (plant_id, quantity, total_price, sold_at) VALUES (8, 2, 12.50, '2026-06-06 17:15:00');
INSERT INTO sales (plant_id, quantity, total_price, sold_at) VALUES (1, 3, 37.50, '2026-06-07 10:50:00');
INSERT INTO sales (plant_id, quantity, total_price, sold_at) VALUES (10, 2, 29.00, '2026-06-07 14:35:00');
INSERT INTO sales (plant_id, quantity, total_price, sold_at) VALUES (5, 1, 35.00, '2026-06-08 12:00:00');
