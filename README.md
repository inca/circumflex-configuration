# Circumflex Configuration API.

Provides methods for convenient overriding values depending on `NODE_ENV`
environment variable.\

Configuration provides a handy technique called _deflating_: a property
can be an object with two keys: `development` and `production`. Actual value
is picked depending on `NODE_ENV=production` environment variable.

See `index.js` for more information.
