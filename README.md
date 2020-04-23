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
- update ingr neupdatne recept - mozna udelat subdotaz, abych nemusel ukladat recipes u ingr

Wishlist

- kde koupit
- cena (per ke koupeno)
- mrazak
- hodnoceni ingredienci
- schedule

## DB

```json
{
  "userGroups": {
    "group-user1": {
      "ingredients": {
        "product1": {
          "title": "Product 1"
        },
        "product2": {
          "title": "Product 2"
        }
      },
      "order": ["product2", "product1"],
      "recipes": {
        "recipe1": {
          "title": "Recipe 1",
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
