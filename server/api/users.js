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
  // db.all('SELECT * FROM orders',
  // (error, users) => {
  //   if(error){
  //     next(error)
  //   } else {
  //     res.status(200).json({users})
  //   }
  // })

  // db.all('SELECT * FROM users JOIN orders ON users.id = orders.user_id',
  // (error, orders) => {
  //   if(error){
  //     next(error)
  //   } else {
  //     res.status(200).json({orders})
  //   }
  // })

  db.all('SELECT * FROM orders JOIN users ON users.id = orders.user_id JOIN order_items ON orders.id = order_items.order_id',
  (error, orders) => {
    if(error){
      next(error)
    } else {
      res.status(200).json({orders})
    }
  })

})

router.get('/:customerID/orders', (req,res,next)=>{
  db.all('SELECT * FROM orders',
  (error, orders) => {
    if(error){
      next(error)
    } else {
      res.status(200).json({orders})
    }
  })
})
module.exports = router
