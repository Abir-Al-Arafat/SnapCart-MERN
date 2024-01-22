// import { useEffect, useState } from "react";
// import axios from "axios";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";

const HomeScreen = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();
  // const [products, setProducts] = useState([]);

  // const fetchProducts = async () => {
  //   const { data } = await axios.get("/api/products");
  //   setProducts(data);
  // };

  // useEffect(() => {
  //   fetchProducts();
  // }, []);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        // <h1>  {error?.data?.message || error.error}</h1>
        <Message variant={"danger"}>
          {" "}
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <h1>Latest Products</h1>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
};

export default HomeScreen;
