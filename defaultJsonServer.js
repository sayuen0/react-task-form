const uuidv4 = require("uuid/v4");
// index.js
module.exports = () => {
  const data = {tasks: []};
  // Create 1000 users
  for (let i = 0; i < 100; i++) {
    // data.users.push({id: i, name: `user${i}`});
    data.tasks.push({id:uuidv4(), body:`hello world${i}`, created_at: new Date(), updated_at: new Date(), done: false })
  }
  return data;
};
