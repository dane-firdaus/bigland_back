const Pusher = require("pusher");

const pusher = new Pusher({
    appId: "1696870",
    key: "07fd33ef10eae19c02dc",
    secret: "5ca4ca7a7bd00b577a75",
    cluster: "ap1",
  });

  module.exports = pusher;