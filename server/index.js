//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require("./src/app.js");
const { conn, Country } = require("./src/db.js");
const fetch = require("node-fetch");

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(3001, () => {
    console.log("Listening at 3001"); // eslint-disable-line no-console
    fetch("https://restcountries.com/v3/all")
      .then((data) => data.json())
      .then((countries) => {
        countries.forEach(async (el) => {
          await Country.create({
            id: el.cca3,
            name: el.name.common,
            flag: el.flags[1],
            continent: el.region,
            capital: el.capital ? el.capital[0] : null,
            subregion: el.subregion,
            area: el.area,
            population: el.population,
          });
        });
      });
  });
});
