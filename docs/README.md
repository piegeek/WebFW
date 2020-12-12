# Backend architecture

1. User makes a request
2. Routers pass that request to a controller(application logic)
3. Helper functions can be used inside a controller(or virtually anywhere)
4. Middleware functions can be used to perform some tasks before passing data to a controller
5. Database folder keeps track of ORM modelling and performs database migrations/rollbacks

# Error codes
0. internal: internal error

1. auth-001: signup errors (eg. auth-001001: internal error)

2. auth-002: login errors
    * auth-002001: user not found error
    * auth-002002: wrong password error
    * auth-002003: account not verified error

3. auth-003: refresh token errors
    * auth-003001: refresh token missing error
    * auth-003002: refresh token not in database error
    * auth-003003: refresh token expired error

4. auth-004: verify user errors

5. auth-005: logout errors
