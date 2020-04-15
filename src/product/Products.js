import React, { useState } from "react";
import { useAsync } from "react-use";
import { Button, Checkbox, TextField } from "@material-ui/core";
import { db } from "../storage/firebase";

export const Products = () => {
  const [products, setProducts] = useState([]);
  const [addValue, setAddValue] = useState("");
  useAsync(async () => {
    const query = db
      .collection("products")
      .where("available", "==", false)
      .limit(50);

    query.onSnapshot((snapshot) => {
      const loadedProducts = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setProducts(loadedProducts);
      // snapshot.forEach((doc) => {
      //   console.log("🛎 ", "doc", doc.data());
      // });
    });
  }, []);

  const add = async () => {
    await db.collection("products").add({
      name: addValue,
      available: false,
    });
    setAddValue("");
  };

  const update = (id) => async () => {
    await db.collection("products").doc(id).update({
      available: true,
    });
  };

  return (
    <div>
      <ul>
        {products.map((product) => (
          <div key={product.id}>
            <Checkbox
              checked={false}
              onChange={update(product.id)}
              //   inputProps={{ "aria-label": "primary checkbox" }}
            />
            {product.name}
          </div>
        ))}
      </ul>
      {/* <input value={addValue} onChange={(e) => setAddValue(e.target.value)} /> */}
      <TextField
        label="Add"
        value={addValue}
        onChange={(e) => setAddValue(e.target.value)}
      />
      <Button
        onClick={add}
        color="primary"
        variant="contained"
        disabled={addValue.trim() === ""}
      >
        Save
      </Button>
    </div>
  );
};
