const router = require('express').Router()
const sqlite3 = require('sqlite3')
const db = new sqlite3.Database('./inhome.db')

router.get('/', (req, res, next)=> {
  db.all('SELECT * FROM users',
  (error, users) => {
    if(error){
      next(error)
    } else {
      res.status(200).json({users})
    }
  })
})

router.get('/orders', (req,res,next)=>{
  db.all('WITH query1 AS (SELECT users.name AS user_name, user_id, orders.id AS order_no FROM orders JOIN users ON users.id = orders.user_id), query2 AS (SELECT * FROM query1 JOIN order_items ON order_items.order_id  = query1.order_no) SELECT user_name, user_id, order_no, COUNT(items.name) AS item_count FROM query2 JOIN items ON items.id = query2.item_id GROUP BY order_no ORDER BY user_id ASC',
  (error, orders) => {
    if(error){
      next(error)
    } else {
      res.status(200).json({orders})
    }
  })
})

router.get('/:customerID/orders', (req,res,next)=>{
  //lists out all the item names in order
  const customerID = req.params.customerID
  db.all('WITH query1 AS (SELECT users.name AS user_name, user_id, orders.id AS order_no FROM orders JOIN users ON users.id = orders.user_id), query2 AS (SELECT * FROM query1 JOIN order_items ON order_items.order_id  = query1.order_no) SELECT user_name, user_id, order_no, item_id, items.name FROM query2 JOIN items ON items.id = query2.item_id WHERE user_id = $customerID ORDER BY order_no ASC', {
    $customerID : customerID
  },
  (error, orders) => {
    if(error){
      next(error)
    } else {
      res.status(200).json({orders})
    }
  })
})
module.exports = router
