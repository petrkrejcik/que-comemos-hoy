# TODO

v1.0

- [x] taby pro ingredience - buy/have/all
- [] delete ingredient (kam?)
- [x] homepage bude login screena
- [x] homepage bude / ne /login
- [x] presunout profil do draweru, protoze misto nej chci mit Add/Edit
- [x] sdileni s jinym uzivatelem
- [] persistent login?
- [x] loader after login
- [] ingr date added

v1.1

- [] namastit recepty + ingredience
- [] odebrat recept id z ingredience
- [] pocitadlo dostupnych ingredienci k receptu
- [] fotka receptu
- [] ingredients lazy load

## Bugs

- input ingred se trochu chybe

Wishlist

- kde koupit
- cena (per ke koupeno)
- mrazak
- hodnoceni ingredienci
- schedule

## DB

```json
{
  "groupIngredients": {
    "userGroup1": {
      "products": {
        "product1": {
          "title": "Product 1"
        },
        "product2": {
          "title": "Product 2"
        }
      },
      "order": ["product2", "product1"]
    }
  },
  "users": {
    "user1": {
      "displayName": "User 1",
      "groupId": "userGroup1"
    },
    "user2": {
      "displayName": "User 2",
      "groupId": "userGroup1",
      "originalGroupId": "userGroup2"
    }
  },
  "userGroups": {
    "userGroup1": {
      "members": {
        "user1": true,
        "user2": true
      }
    }
  }
}
```

- ingredients
  - masa
    - Masa
    - available: true
    - recipes
      - bizcocho
      - pizza
  - azucar
    - Azucar
    - available: false
  - carne
    - Carne
    - available: true
- recipes
  - bizcocho
    - Bizcocho
    - Horno 40 min
    - ingredients
      - masa
        - Masa
        - available: true
        - optional: false
        - alternative
          - harina
            - Harina
            - available: true

* users
  - abcdef
    - members
      asdqw34: true
      micxvoj: true

## Firestore

### Collections

`Products`
`Recipes`

## Icons

https://material-ui.com/components/material-icons/
