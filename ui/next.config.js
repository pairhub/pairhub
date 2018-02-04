// removes aliases to react and react-dom as a workaround for this issue:
// https://github.com/zeit/next.js/issues/1877#issuecomment-299396974
module.exports = {
  webpack: function (c) {
    if (c.resolve.alias) {
      delete c.resolve.alias['react']
      delete c.resolve.alias['react-dom']
    }
    return c
  }
}
