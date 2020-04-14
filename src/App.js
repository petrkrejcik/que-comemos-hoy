import React, { useState, useRef } from "react";
import { useAsync } from "react-use";
import { db } from "./storage/firebase";
import "./App.css";

function App() {
  const textInput = useRef(null);
  const [products, setProducts] = useState([]);
  useAsync(async () => {
    const query = db.collection("products").limit(50);

    query.onSnapshot((snapshot) => {
      const loadedProducts = snapshot.docs.map((doc) => doc.data());
      setProducts(loadedProducts);
      // snapshot.forEach((doc) => {
      //   console.log("🛎 ", "doc", doc.data());
      // });
    });
  }, []);

  const write = async () => {
    const value = textInput.current.value;
    await db.collection("products").add({
      name: value,
    });
  };

  return (
    <div className="App">
      <ul>
        {products.map((product) => (
          <li key={product.name}>{product.name}</li>
        ))}
      </ul>
      <input ref={textInput} />
      <button onClick={write}>Save</button>
    </div>
  );
}

export default App;
