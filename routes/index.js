var express = require('express');
var router = express.Router();
const request = require('request');
var session = require('express-session')

const BASE_URL = "http://localhost:3000/api/"

var cartItems = []

function checkCartObject(req, res, next) {
  if(req.session.cart) cartItems = req.session.cart
  next()
}

/* GET home page. */
router.get('/', checkCartObject, function(req, res, next) {
  res.render('index', { title: 'Express', cartItems: cartItems.length });
});


/* Get the about us page */
router.get('/about', (req, res, next) => {
  res.render('about')
})

/* Get business solutions page */
router.get('/business', checkCartObject, (req,res,next) => {
  request.get({
    url: `${BASE_URL}products/category/2`,
    method: "GET",
    headers: {
      'Content-Type': 'application/json'
    }
  }, (err, response) => {
    if(err) throw err;

    let somecollection = JSON.parse(response.body)

    res.render('business', { products: somecollection, cartItems: cartItems.length })
  })

  // res.render('business')
})


/* Get websites and hosting page */
router.get('/websites',checkCartObject, (req, res, next ) => {
  res.render('websites', { cartItems: cartItems})
})

/* Get the client area login  */
router.get('/login', (req,res,next) => {
  res.render('login')
})

/* Get the bulk sms page */
router.get('/bulksms', checkCartObject, (req, res, next) => {
  res.render('bulksms', { cartItems: cartItems})
})

/* get the school systems */
router.get('/schools', checkCartObject, (req, res, next) => {
  res.render('schools', { cartItems: cartItems})
})

/* get realestate solutions */
router.get('/realestate', checkCartObject, (req, res, next) => {
  res.render('realestate', { cartItems: cartItems})
})

router.get('/farming', checkCartObject, (req,res,next)=> {
  res.render('farming', { cartItems: cartItems})
})

router.post('/addtocart', (req,res,next) => {
  let prodId = req.body.itemid
  request.get({
    url: `${BASE_URL}products/${prodId}`,
    method: 'GET'
  }, (errorMesage, response) => {
    if(errorMesage) throw errorMesage;

    let item = JSON.parse(response.body)

    if(cartItems.find(x => x.id) == item.id ) console.log("Item already in cart")

    cartItems.push(item);
    req.session.cart = cartItems

    res.status(200).json(cartItems.length)
  })
})

router.get('/cartitems', checkCartObject, (req,res,next) => {
  if(!req.session.cart) {

    res.status(403).render('cart', { notfound: "No Items in your cart", cartItems: cartItems.length })

    next()
  } 

  let total =  0

  res.render('cart', { notfound: null , cart: cartItems, cartItems: cartItems.length, total  })

})



module.exports = router;
