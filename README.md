# Walmart Inhome

## Getting Started
1. To view your local version of this project, please open **index.html** in Google Chrome
2. Additional packages installed details, explanation
3. need to run seed file by executing `npm run seed`


## Database Tables - starting point schema:
* **Users**
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR(255) NOT NULL
);
* **Items**
CREATE TABLE items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR(255) NOT NULL
)
* **Orders**
CREATE TABLE orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  FOREIGN KEY(user_id) REFERENCES users(id)
)
* **Order Items**
CREATE TABLE order_items (
  order_id INTEGER NOT NULL,
  item_id INTEGER NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id),
  FOREIGN KEY (item_id) REFERENCES items(id),
  PRIMARY KEY (order_id, item_id)
)


## Routes
- GET
- POST
- PUT
- DELETE
