import { useState, useEffect } from "react";

const Products = () => {
  const [apiData, setApiData] = useState(null);
  const [panier, setPanier] = useState([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const request = await fetch(
          "https://passerelle-shop-api.julienpoirier-webdev.com/products"
        );

        const data = await request.json();
        setApiData(data);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);
  return (
    <>
      {apiData ? (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {apiData.map((product) => {
            return (
              <div
                key={product._id}
                style={{
                  border: "2px solid black",
                  margin: "5px",
                  padding: "20px",
                  width: "200px",
                }}
              >
                <div>
                  <h1 style={{ fontSize: "16px" }}>{product.name}</h1>
                  <p>{product.description}</p>
                  <h3>{product.price} €</h3>
                </div>
                <div>
                  <img
                    style={{ width: "100%", minWidth: "100px" }}
                    src={product.mainImageURL}
                    alt=""
                  />
                </div>
                <button onClick={() => {}}>Acheter</button>
              </div>
            );
          })}
        </div>
      ) : null}
    </>
  );
};

export default Products;
