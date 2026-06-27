// const dns = require("dns");

// dns.resolveSrv(
//   "_mongodb._tcp.cluster4.qsjjftg.mongodb.net",
//   (err, addresses) => {
//     if (err) {
//       console.error(err);
//     } else {
//       console.log(addresses);
//     }
//   }
// );
const dns = require("dns");

dns.resolveSrv("_xmpp-server._tcp.gmail.com", (err, records) => {
  console.log(err || records);
});