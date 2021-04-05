# Api documentation

| HTTP method | Badge                                                     | Meaning                      |
| ----------- | --------------------------------------------------------- | ---------------------------- |
| POST        | ![POST](https://img.shields.io/badge/HTTP-POST-blue)      | Creates a new resource       |
| GET         | ![GET](https://img.shields.io/badge/HTTP-GET-brightgreen) | Fetches the resources        |
| PUT         | ![PUT](https://img.shields.io/badge/HTTP-PUT-blueviolet)  | Updates an existing resource |
| DELETE      | ![DELETE](https://img.shields.io/badge/HTTP-DELETE-red)   | Deletes an existing resource |

---

## Base url

`http://localhost:7000`

---

## Products

![GET](https://img.shields.io/badge/HTTP-GET-brightgreen)

`/products?query=query`

_Returns all products_

### Arguments:

- none

### Returns:

Status code: ![200](https://img.shields.io/badge/CODE-200-yellowgreen)

```json
[
	{
		"id": 01,
		"name": "Product Name",
		"des": "Product description",
		"price": "200",
		"cover": "https://imgbb.com/image.png",
		"sellerId": 02
	}
]
```

Status code: Other than ![200](https://img.shields.io/badge/CODE-200-yellowgreen)

```json
[]
```

---

![POST](https://img.shields.io/badge/HTTP-POST-blue)

`/products`

_Inserts a product_

### Arguments:

- email - [STRING]
- hash - [STRING] seller hash value must be equal to the owner seller hash
- product - [OBJECT] product object

### Returns:

Status code: ![200](https://img.shields.io/badge/CODE-200-yellowgreen)

```json
{
	"status": true,
	"error": null
}
```

Status code: Other than ![200](https://img.shields.io/badge/CODE-200-yellowgreen)

```json
{
	"status": false,
	"error": "Error message"
}
```

---

![PUT](https://img.shields.io/badge/HTTP-PUT-blueviolet)

`/products`

_Updates a specific product_

### Arguments:

- email - [STRING]
- hash - [STRING] seller hash value must be equal to the owner seller hash
- product - [OBJECT] product object

### Returns:

Status code: ![200](https://img.shields.io/badge/CODE-200-yellowgreen)

```json
{
	"status": true,
	"error": null
}
```

Status code: Other than ![200](https://img.shields.io/badge/CODE-200-yellowgreen)

```json
{
	"status": false,
	"error": "Error message"
}
```

---

![DELETE](https://img.shields.io/badge/HTTP-DELETE-red)

`/products/:id`

[id: number] - Id of the product

_Deletes a specific product_

### Arguments:

- email - [STRING]
- hash - [STRING] seller hash value must be equal to the owner seller hash

### Returns:

Status code: ![200](https://img.shields.io/badge/CODE-200-yellowgreen)

```json
{
	"status": true,
	"error": null
}
```

Status code: Other than ![200](https://img.shields.io/badge/CODE-200-yellowgreen)

```json
{
	"status": false,
	"error": "Error message"
}
```

---

## Authentication

![POST](https://img.shields.io/badge/HTTP-POST-blue)

`/auth`

_Makes a login request_

### Arguments:

- mode - [STRING] value either ("login" | "signup")
- type - [STRING] value either ("user" | "seller")
- email - [STRING] email address
- pwd - [STRING] plain password

### Returns:

Status code: ![200](https://img.shields.io/badge/CODE-200-yellowgreen)

```json
{
	"email": "username@domain.com",
	"hash": "<RANDOM HASH STRING>",
	"type": "user | seller",
	"error": null
}
```

Status code: Other than ![200](https://img.shields.io/badge/CODE-200-yellowgreen)

```json
{
	"error": "Error message"
}
```

---

## Purchases

![GET](https://img.shields.io/badge/HTTP-GET-brightgreen)

`/purchases/:userId`

userId: number => user id

_Returns all purchases made by a user_

### Arguments:

- none

### Returns:

Status code: ![200](https://img.shields.io/badge/CODE-200-yellowgreen)

```json
[
	{
		"id": 01,
		"userId": 11,
		"productId": 12,
		"status": 0
	}
]
```

Status code: Other than ![200](https://img.shields.io/badge/CODE-200-yellowgreen)

```json
[]
```

---

![POST](https://img.shields.io/badge/HTTP-POST-blue)

`/purchases`

_Creates a new purchase entry_

### Arguments:

- email - [STRING]
- hash - [STRING] Hash of the requesting user
- purchase - [OBJECT] purchase object

### Returns:

Status code: ![200](https://img.shields.io/badge/CODE-200-yellowgreen)

```json
{
	"status": true,
	"error": null
}
```

Status code: Other than ![200](https://img.shields.io/badge/CODE-200-yellowgreen)

```json
{
	"status": false,
	"error": "Error message"
}
```

---

![PUT](https://img.shields.io/badge/HTTP-PUT-blueviolet)

`/purchases`

_Updates an existing purchase entry_

### Arguments:

- email - [STRING]
- hash - [STRING] Hash of the requesting user
- purchase - [OBJECT] purchase object

### Returns:

Status code: ![200](https://img.shields.io/badge/CODE-200-yellowgreen)

```json
{
	"status": true,
	"error": null
}
```

Status code: Other than ![200](https://img.shields.io/badge/CODE-200-yellowgreen)

```json
{
	"status": false,
	"error": "Error message"
}
```

---

![DELETE](https://img.shields.io/badge/HTTP-DELETE-red)

`/purchases/:purchaseId`

purchaseId: number => Purchase Id

_Deletes an existing purchase entry_

### Arguments:

- email - [STRING]
- hash - [STRING] Hash of the requesting user

### Returns:

Status code: ![200](https://img.shields.io/badge/CODE-200-yellowgreen)

```json
{
	"status": true,
	"error": null
}
```

Status code: Other than ![200](https://img.shields.io/badge/CODE-200-yellowgreen)

```json
{
	"status": false,
	"error": "Error message"
}
```

---
