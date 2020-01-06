const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./inhome.db')
function seedOrdersDatabase(done) {
  db.serialize(function() {
    db.run('DROP TABLE IF EXISTS orders');
    db.run('CREATE TABLE IF NOT EXISTS `orders` ( ' +
                   '`id` INTEGER NOT NULL, ' +
                   '`user_id` INTEGER NOT NULL, ' +
                   'PRIMARY KEY(`id`), ' +
                   'FOREIGN KEY(`user_id`) REFERENCES `users`(`id`) )');
    db.run('DROP TABLE IF EXISTS order_items');
    db.run('CREATE TABLE IF NOT EXISTS `order_items` ( ' +
                      '`order_id` INTEGER NOT NULL, ' +
                      '`item_id` INTEGER NOT NULL, ' +
                      'FOREIGN KEY(`order_id`) REFERENCES `orders`(`id`), ' +
                      'FOREIGN KEY(`item_id`) REFERENCES `items`(`id`), ' +
                      'PRIMARY KEY(`order_id`, `item_id`) )');
  });
}
seedOrdersDatabase(() => {})

db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='orders'", (error, table) => {
  if (error) {
    throw new Error(error);
  }

  if (table) {
    db.serialize(function() {
      let orderID;
      db.run("INSERT INTO orders (user_id) VALUES (3)", function(error) {
        if (error) {
          throw new Error(error);
        }
        orderID = this.lastID;
      });

      db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='order_items'", (error, table) => {
        if (error) {
          throw new Error(error);
        }
        if (table) {
          db.run(`INSERT INTO order_items (item_id, order_id) VALUES (10, ${orderID})`);
          db.run(`INSERT INTO order_items (item_id, order_id) VALUES (8, ${orderID})`);
        }
      });

      db.run("INSERT INTO orders (user_id) VALUES (1)", function(error) {
        if (error) {
          throw new Error(error);
        }
        orderID = this.lastID;
      });

      db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='order_items'", (error, table) => {
        if (error) {
          throw new Error(error);
        }
        if (table) {
          db.run(`INSERT INTO order_items (item_id, order_id) VALUES (1, ${orderID})`);
          db.run(`INSERT INTO order_items (item_id, order_id) VALUES (7, ${orderID})`);
          db.run(`INSERT INTO order_items (item_id, order_id) VALUES (6, ${orderID})`);
        }
      });

      db.run("INSERT INTO orders (user_id) VALUES (5)", function(error) {
        if (error) {
          throw new Error(error);
        }
        orderID = this.lastID;
      });

      db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='order_items'", (error, table) => {
        if (error) {
          throw new Error(error);
        }
        if (table) {
          db.run(`INSERT INTO order_items (item_id, order_id) VALUES (1, ${orderID})`);
          db.run(`INSERT INTO order_items (item_id, order_id) VALUES (3, ${orderID})`);
          db.run(`INSERT INTO order_items (item_id, order_id) VALUES (9, ${orderID})`);
          db.run(`INSERT INTO order_items (item_id, order_id) VALUES (2, ${orderID})`);
        }
      });

      db.run("INSERT INTO orders (user_id) VALUES (2)", function(error) {
        if (error) {
          throw new Error(error);
        }
        orderID = this.lastID;
      });

      db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='order_items'", (error, table) => {
        if (error) {
          throw new Error(error);
        }
        if (table) {
          db.run(`INSERT INTO order_items (item_id, order_id) VALUES (4, ${orderID})`);
          db.run(`INSERT INTO order_items (item_id, order_id) VALUES (10, ${orderID})`);
          db.run(`INSERT INTO order_items (item_id, order_id) VALUES (9, ${orderID})`);
        }
      });

      db.run("INSERT INTO orders (user_id) VALUES (4)", function(error) {
        if (error) {
          throw new Error(error);
        }
        orderID = this.lastID;
      });

      db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='order_items'", (error, table) => {
        if (error) {
          throw new Error(error);
        }
        if (table) {
          db.run(`INSERT INTO order_items (item_id, order_id) VALUES (5, ${orderID})`);
          db.run(`INSERT INTO order_items (item_id, order_id) VALUES (10, ${orderID})`);
        }
      });

      db.run("INSERT INTO orders (user_id) VALUES (1)", function(error) {
        if (error) {
          throw new Error(error);
        }
        orderID = this.lastID;
      });

      db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='order_items'", (error, table) => {
        if (error) {
          throw new Error(error);
        }
        if (table) {
          db.run(`INSERT INTO order_items (item_id, order_id) VALUES (9, ${orderID})`);
          db.run(`INSERT INTO order_items (item_id, order_id) VALUES (1, ${orderID})`);
          db.run(`INSERT INTO order_items (item_id, order_id) VALUES (3, ${orderID})`);
          db.run(`INSERT INTO order_items (item_id, order_id) VALUES (8, ${orderID})`);
          db.run(`INSERT INTO order_items (item_id, order_id) VALUES (10, ${orderID})`);
        }
      });

    });
  }
})
