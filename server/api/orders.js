const router = require('express').Router()
const sqlite3 = require('sqlite3')
const db = new sqlite3.Database('./inhome.db')


//get all orders
router.get('/', (req, res, next)=> {
  db.all('SELECT order_id, item_id, items.name AS item_name FROM order_items JOIN items ON items.id = order_items.item_id',
  (error, orders) => {
    if(error){
      next(error)
    } else {
      res.status(200).json({orders})
    }
  })
})

//get single order by order ID
router.get('/:orderID', (req,res,next)=>{
  //lists out all the items in order
  const orderID = req.params.orderID
  db.all('SELECT order_id, item_id, items.name AS item_name FROM order_items JOIN items ON items.id = order_items.item_id WHERE order_id = $orderID', {
    $orderID : orderID
  },
  (error, orders) => {
    if(error){
      next(error)
    } else {
      res.status(200).json({orders})
    }
  })
})


//create new order
router.post('/', async (req,res, next) => {
  //helper function to resolve promises so we can check if user id is valid
  db.getAsync = function (sql) {
    var that = this
    return new Promise(function (resolve, reject) {
        that.get(sql, function (err, row) {
            if (err)
                reject(err)
            else
                resolve(row)
        })
    })
  }

  const userID = req.body.userid
  const items = req.body.items
  let validUserId
  let errors = []
  let checkUserId = `SELECT users.id from users WHERE users.id = ${userID}`
  let row = await db.getAsync(checkUserId)
  if (!row){
    errors.push("No existing user ID in database")
  } else {
    validUserId = row.id
  }
  if (items.length === 0){
    errors.push("No items specificied to add to order")
  }
  if (errors.length){
    console.log('error', errors.join(', '))
    res.status(400).json({"error": errors.join(', ')})
    return
  }

  let sql = `INSERT INTO orders (user_id) VALUES ($validUserId)`
  let values = { $validUserId : validUserId}
  //insert into the orders table to get new order id
  db.run(sql, values, function(err){
    if(err){
      next(error)
    } else {
      let orderId = this.lastID
      let placeholders = items.map((item)=> '(?,?)').join(',')
      let itemsIdordersId = items.map((itemid)=> `(${orderId},${itemid})`).join(', ')
      let sql2 = 'INSERT INTO order_items (order_id, item_id) VALUES ' + itemsIdordersId
      db.run(sql2, function(err, result){
        if(err){
          return console.error(err.message)
        }
        console.log(`Rows inserted ${this.changes}`)
        res.status(201).json({"id": orderId})
      })
    }
  })
})

//add and/or remove single items in the order
router.put('/:orderID', (req, res, next)=> {
let addList = req.body.add
let removeList = req.body.remove
let orderID = req.params.orderID
if(addList.length > 0) {
  let itemsIdordersId = addList.map((itemid)=> `(${orderID},${itemid})`).join(', ')
    let sql1 = 'INSERT INTO order_items (order_id, item_id) VALUES ' + itemsIdordersId
    db.run(sql1, function(err, result){
      if(err){
        return console.error(err.message)
      } else {
        if(removeList) {
          for (let i = 0; i<removeList.length; i++){
            let item = removeList[i]
            let sql2 = `DELETE FROM order_items WHERE order_id = ${orderID} AND item_id = ${item}`
              db.run(sql2, function(err){
                if(err){
                  return console.error(err.message)
                }else {
                  console.log(`Rows removed ${this.changes}`)
                }
              })
          }
        }
        res.status(201).json({"id": orderID})
      }
    })
  } else {
    if(removeList) {
      for (let i = 0; i<removeList.length; i++){
        let item = removeList[i]
        let sql2 = `DELETE FROM order_items WHERE order_id = ${orderID} AND item_id = ${item}`
          db.run(sql2, function(err){
            if(err){
              return console.error(err.message)
            }else {
              console.log(`Rows removed ${this.changes}`)
            }
          })
      }
    }
    res.status(201).json({"id": orderID})
  }
})


//this deletes the entire order
router.delete('/:orderID', (req,res,next)=> {
  let orderID = req.params.orderID
  const sql = 'DELETE FROM orders WHERE orders.id = $orderID'
  const values = {$orderID: req.params.orderID}
  db.run(sql, values, (error) => {
    if(error){
      next(error)
    } else {
      res.status(204).json({"id": orderID})
    }
  })
})


module.exports = router
