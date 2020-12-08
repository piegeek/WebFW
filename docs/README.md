# Backend architecture

1. User makes a request
2. Routers pass that request to a controller(application logic)
3. Helper functions can be used inside a controller(or virtually anywhere)
4. Middleware functions can be used to perform some tasks before passing data to a controller
5. Database folder keeps track of ORM modelling and performs database migrations/rollbacks