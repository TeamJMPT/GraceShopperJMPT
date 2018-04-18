# Cart

## Goals

Customers can add/remove quests to the cart
  ...when logged in
  ...when not logged in

Customers can have multiple tickets for the same quest in the cart

Customers can see what's in their cart

A customers' cart persists
  ...when not logged in, until they clear cookies / session data
  ...when logged in, until they buy it or delete it explicitly

(Eventually) customers can check out
  - we'll record the purchase in the db somehow

## Approaches to the cart

### Store the cart on the backend
* Define a model for the cart
  - Probably `Order`

* Middleware that sets req.cart:
  - if req.cart is already a thing, just next()
  - if req.session.cartId is set, then load that cart as req.cart, and next()
  - Otherwise we have to create a cart, or maybe find one that this user left behind:
    - Is anyone logged in? (is req.user a thing?)
      - If so, findOrCreate a cart for them
      - (Finding an existing cart is a stretch goal.)
    - Otherwise, findOrCreate a cart owned by nobody
    - In any case, put the cartId on req.session.cartId

* POST /api/cart
* GET /api/cart
```
app.get('/api/cart', (req, res) => res.send(req.cart))
```

**Q: What if someone is logged out, adds items to their cart, then logs in?**
**A: Adoption** Ideally, the cart's owner becomes the user.

But, this is a stretch goal.

#### Pros
* Ability to persist across devices/cookie resets for logged in users
* Users can only manipulate the cart by hitting your routes
  - Kindof more secure? But only if the routes are enforcing restrictions, i.e.
  how many of something you can put into your cart.
* Users can have multiple carts ("save for later")
* Buying is easier, since we already have an instance of the Order model as
  req.cart
  - so if we make a `buy` instance method, we can just call req.cart.buy()

#### Cons
* The middleware has a lot of possible cases
* Latency on adding to cart (because it requires a POST to the server)


### Store the cart in [LocalStorage](https://developer.mozilla.org/en-US/docs/Web/API/Storage/LocalStorage)

**Q: How to serialize js objects into LocalStorage?**

Use JSON!

```js
localStorage.hello = JSON.stringify(['a', 1, 2, 3])
"["a",1,2,3]"

JSON.parse(localStorage.hello)
(4) ["a", 1, 2, 3]

localStorage.cart = {1: 1, 2: 10, 3: 3}
{1: 1, 2: 10, 3: 3}

localStorage.cart
"[object Object]"

localStorage.cart = JSON.stringify({1: 1, 2: 10, 3: 3})
"{"1":1,"2":10,"3":3}"

JSON.parse(localStorage.cart)
{1: 1, 2: 10, 3: 3}
```

#### Pros
* Cart thunks are simpler than the cart middleware would be
* Extremely low latency

#### Cons
* The cart is tied to the browser
* Even logged in users lose the cart if they reset browsing data (local storage)
* Can be a little tricky to make work correctly from multiple tabs
  - Make sure you load the cart every time before you modify it!
