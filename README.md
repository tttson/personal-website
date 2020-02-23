# Walmart Inhome

## Getting Started
1. To view your local version of this project, please **npm install**, then **npm run start**

Packages installed:
* axios - promise based HTTP client for the browser and node.js
* body-parser - body parsing middleware
* cors - set of headers that allow the browser and server to communicate about which requests are (and are not) allowed
* express - library for handling route requests
* google-maps-react - used for geocoding address locations, API key is hidden
* nodemon - monitors changes in source code and automatically restarts server
* path - access and interact with file system
* react - for UI
* sqlite3 - database
* babel - javascript compiler
* errorhandler - error handler middleware for development
* webpack - bundles and compresses files, outputs bundle.js

2. Need to run seed file by executing `npm run seed`


## Database Tables - given schema:
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


## API routes used
- GET
* '/api/products' : gets all items from the items table
* '/api/customers/orders' : gets all users and their associated orders
* '/api/orders' : gets itemized orders without user data
* '/api/customers' : gets all users info, id and name
* '/api/orders/:orderID' : gets single order and order details by order ID
* Google geocode api route
- POST
* '/api/orders' : posts newly created order and adds to database
*
- PUT
* '/api/orders/:orderID' : adds/removes items to existing orders on the order_items table
- DELETE
*'/api/orders/:orderID' : deletes entire order by order ID

## User flow
- read, create, update, and delete orders
- once customer rep is on the landing page, he/she will have access to the table of current orders
- UPDATE: if he/she needs to update orders, the navigation bar hosts the link to update orders. Once on the update order page, he/she enters valid order ID to get the order in database. Single order is returned if the order ID exists. User can update order by removing something from the exisiting order or add an item that  is not currently in the order. Units are ignored for this exercise. Once updates are made, he/she can submit the changes to be made in the database.
* would be good to have a column for quantity in the order items table so multiple of the same items
* would be good to include error message stating invalid order ID in the future
* would be good to be able to enter multiple order IDs to return specific orders in one shot
- DELETE: if he/she needs to delete an item from the database, he/she can navigate to the update orders page where they can enter the order ID and click  'delete entire  order' or remove a single item from the order.
- CREATE: if he/she needs to create orders, the navigation bar hosts the link to create orders. Once on the create order page, he/she enters valid user ID to get the user in database. Once user ID is entered, a items are selected via the checkbox. When ready, he/she can submit the new order and the order table and the order items table will be updated.
-  READ: Product tables, Itemized order tables, Orders by Customer ID table, Users tables are available
* would be good to have filter abilities on the UI

## File directories
- Public folder: static files, images, and bundle.js
- Server folder: API routes, index.js (backend setup)
- src folder: index.js, root App component, all components

## Additional features /enhancements to be added in future:
Front end:
* 404 page not found component
* most frequently ordered items
- Back end:
* add quantity column to order items table
* add address column to users table
* more efficient querying in deleting multiple of items in the order
* testing using Mocha and Chai
