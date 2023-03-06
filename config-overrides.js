// eslint-disable-next-line @typescript-eslint/no-var-requires,no-undef
const {alias, configPaths} = require('react-app-rewire-alias')

// eslint-disable-next-line no-undef
module.exports = function override(config) {
  alias(configPaths())(config)
  return config
}
