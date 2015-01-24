# Simple Environment-Friendly Configuration API

Provides simple API for configuring apps using JSON while allowing to override values based on environment variables and `NODE_ENV=production`.

Configuration provides a handy technique called _deflating_: a property
can be an object with two keys: `development` and `production`. Actual value
is picked depending on `NODE_ENV=production` environment variable.

See `index.js` for more information.
