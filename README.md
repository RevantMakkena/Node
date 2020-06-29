# Node

There are 3 ways of handling Async Code

1. Callbacks
2. Promises
3. Async/Await

//To read & write a file const fs = require('fs')

const storeData = (data, path) => { try { fs.writeFileSync(path, JSON.stringify(data)) } catch (err) { console.error(err) } }

## To debug node apps

node --inspect-brk <File Name> chrome://inspect to debug in chrome debug tools
