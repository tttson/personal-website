const router = require('express').Router()
const sqlite3 = require('sqlite3')
const db = new sqlite3.Database('./inhome.db')

//get all products from items table
router.get('/', (req, res, next)=> {
  db.all('SELECT * FROM items',
  (error, products) => {
    if(error){
      next(error)
    } else {
      res.status(200).json({products})
    }
  })
})

module.exports = router
