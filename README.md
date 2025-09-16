# PostgreSQL Query Binder
**✨ Bind objects to safe PostgreSQL queries** – turn your plain objects into fully parameterized SQL with zero hassle.


## Features
- 🔒 Safely converts **JavaScript/TypeScript objects** into parameterized PostgreSQL queries.
- 🧩 Use simple placeholders like `$(key)` inside your SQL strings.  
- 📝 100% **TypeScript-first** with generics and type inference.  
- ⚡ Instant error feedback if a placeholder is missing in the `values` object.  
- 🎯 Returns `[sqlWithPlaceholders, valuesArray]` ready for `pg.query()`.  
- ✅ Strongly typed – TypeScript validates your object against SQL placeholders.  

---

## Installation

```bash
npm install pg-binder
```

or with Yarn:

```bash
yarn add pg-binder
```

---

## Usage Examples

```js
import { Pool } from 'pg';
import pgSqlBind from 'pg-binder';

const pool = new Pool({ /* your Postgres config */ });
const query = `
  INSERT INTO products (name, price, stock)
  VALUES ($(name), $(price), $(stock))
  RETURNING *
`;


const result = await pool.query(...pgSqlBind(query, {
    name: 'Laptop',
    price: 999.99,
    stock: 50
}));

console.log(result.rows[0]);
```

---

## License

MIT © Avijit
