# Build

`REACT_APP_ENV=develop yarn build`

# Test

`firebase init firestore`
`firebase setup:emulators:firestore`
`firebase emulators:start --only firestore`

# TODO

- variant
  - zobrazit varianty produktu a u kazdy cenu
  - zobrazit kolik stoji tahle varianta v urcitem obchode
- pri testu neni logged user, protoze to na nej v Content nepocka (Content se nerenderuje)
- rozlisit produkt vs. uvareny jidlo v mrazaku
- odstranit `--env=jest-environment-jsdom-sixteen` az bude jest 25
- useUserData aby vzdy vratilo data a ne i treba loading

v1.0

- [ ] shops
  - [x] CRUD
  - [x] assign shop to product
- [ ] frozen
  - [ ] dva checkboxy pro availability - seru na to, moc by se to zkomplikovalo a "jenom" to resi dostupnost receptu

v1.1

- [ ] products
  - [ ] sort by insert date
  - [ ] sort by drag and drop
  - [ ] sort by shop
- [ ] shops
  - [ ] edit title zustane pro pridani novyho shopu vyplneny
  - [ ] remove shop from product
  - [ ] price per shop
- [ ] Remove bottom nav when in other page than products
- [ ] immer.js
  - pouzit, abych nepreukladal cely objekt productu
  - pouzit hook misto useMap?
- [ ] je divny, ze tam jsou dva loadery. Idealne jenom skeleton
- [ ] delete ingredient (kam?)
- [ ] namastit recepty + ingredience
- [ ] odebrat recept id z ingredience
- [ ] pocitadlo dostupnych ingredienci k receptu
- [ ] fotka receptu
- [ ] ingredients lazy load

## Typy produktu

- Vysrat se na typy a mit to jako kategorie. Bude to jednodussi, kdyz chci koupit oba typy.
- Typy
  - Pan
    - de maiz
    - de semillas
- Kategorie
  - Pan de semillas #pan
  - Pan de maiz #pan

## Freezer

- Jeden produkt muze byt v obou stavech
- Bud je na seznamu ke koupi, nebo neni dostupny
  - Uz nemam avokado, ale nechci ho koupit (v zime)
- Musim byt schopny dat do listu, ze chci koupit but ten nebo ten stav
  - Ne, protoze jsou to odlisny produkty
- Neni to proste kategorie #frozen?
  - neni, protoze muzu mit cast zmrazeno a cast ne

### Flow zamrazeni vseho

- Vyberu stav 'Frozen': 'Yes'
- Ulozi se "availability": {"frozen": true}

### Flow zamrazeni/rozmrazeni casti

- Vyberu stav 'frozen': 'Both'
- Ulozi se "availability": {"normal": true, "frozen": true}

### Flow rozmrazeni

- Vyberu stav 'frozen': 'No' / Klidnu na produkt v mrazaku
- Ulozi se "availability": {"normal": true}

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
          "available": true,
          "isOnShoppingList": false,
          "lists": {
            "shopping": true
          },
          "availability": {
            "default": true,
            "frozen": true
          },
          "variants": {
            "voldamm33": {
              "title": "Voll Damm 33 ml",
              "quantity_": "33",
              "unit_": "ml",
              "rating": 3.5,
              "shops": {
                "shop1": {
                  "price": 0.7
                }
              }
            }
          }
        },
        "product2": {
          "title": "Product 2",
          "available": false,
          "shop": "eroski",
          "shop_": {
            "shop1": {
              "price": 1,
              "selected": true
            },
            "shop2": {
              "price": 1.2
            }
          },
          "frozen_": "part",
          "categories_": {}
        }
      },
      "ingredientsOrder": ["product2", "product1"],
      "shops": {
        "shop1": {
          "title": "Shop 1",
          "created": "datetime"
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

## Firebase CLI

`firebase use default`
`firebase use develop`

## Icons

https://material-ui.com/components/material-icons/

<div>Icons made by <a href="https://www.flaticon.com/authors/those-icons" title="Those Icons">Those Icons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
