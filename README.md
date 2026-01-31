# todo-api-with-json-file
Store data in this format in json file
```bash
{
  "products": [
    {
      "id": "p1",
      "name": "Laptop",
      "price": 55000,
      "inStock": true
    }
  ]
}

```

```js
const fs = require('fs');
const data = fs.readFileSync(FILE, "utf-8");
const todoData = data ? JSON.parse(data) : [];
fs.writeFileSync(FILE, JSON.stringify(todos, null, 2));
```
