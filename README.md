# todo-api-with-json-file

```js
const fs = require('fs');
const data = fs.readFileSync(FILE, "utf-8");
const todoData = data ? JSON.parse(data) : [];
fs.writeFileSync(FILE, JSON.stringify(todos, null, 2));
```
