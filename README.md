# TODO

v1.0

- [ ] zavrit drawer po kliku
- [ ] jak udelat manage shops - obecne crud
- [ ] update, delete
- [ ] loading roztahnout
- [x] taby pro ingredience - buy/have/all
- [ ] delete ingredient (kam?)
- [x] homepage bude login screena
- [x] homepage bude / ne /login
- [x] presunout profil do draweru, protoze misto nej chci mit Add/Edit
- [x] sdileni s jinym uzivatelem
- [ ] persistent login?
- [x] loader after login
- [x] ingr date added

v1.1

- [ ] namastit recepty + ingredience
- [ ] odebrat recept id z ingredience
- [ ] pocitadlo dostupnych ingredienci k receptu
- [ ] fotka receptu
- [ ] ingredients lazy load

## Bugs

- input ingred se trochu chybe
- update ingr neupdatne recept - mozna udelat subdotaz, abych nemusel ukladat recipes u ingr

Wishlist

- kde koupit
- cena (per ke koupeno)
- mrazak
- hodnoceni ingredienci
- schedule

## DB

Hooks doc: https://github.com/csfrequency/react-firebase-hooks/tree/7eb49f1624d7c1bfb5ad8083a8702b19bf0e6929/firestore

```json
{
  "userGroups": {
    "group-user1": {
      "ingredients": {
        "product1": {
          "title": "Product 1",
          "available": true
        },
        "product2": {
          "title": "Product 2",
          "available": false,
          "shop": {
            "shop1": true
          }
        }
      },
      "ingredientsOrder": ["product2", "product1"],
      "shops": {
        "shop1": {
          "title": "Shop 1"
        }
      },
      "recipes": {
        "recipe1": {
          "title": "Recipe 1",
          "ingredientsStatus": {
            "alternative": 0,
            "missing": 1
          },
          "ingredients": {
            "product1": {
              "title": "Product 1"
            }
          }
        }
      }
    }
  },
  "users": {
    "user1": {
      "groupId": "group-user1",
      "originalGroupId": "group-user1"
    },
    "user2": {
      "groupId": "group-user1",
      "originalGroupId": "group-user2"
    }
  },
  "userGroups_tmp": {
    "group-user1": {
      "members": {
        "user1": true,
        "user2": true
      }
    }
  }
}
```

## Icons

https://material-ui.com/components/material-icons/
