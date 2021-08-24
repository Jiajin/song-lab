const app = require("./app");

const server = app.listen(PORT, () => {
  console.log(`You're listening to the smooth sounds of port ${PORT}...`);
});
