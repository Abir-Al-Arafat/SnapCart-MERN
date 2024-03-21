// import { useEffect, useState } from "react";
// import axios from "axios";
import { Row, Col, Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Product from "../components/Product";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
import Meta from "../components/Meta";
const HomeScreen = () => {
  const { pageNumber, keyword } = useParams();
  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

  return (
    <>
      {keyword ? (
        <Link to="/">
          {/* <Button className="btn btn-dark mb-4" variant="outline-primary">Back to Homepage</Button> */}
          <Button variant="outline-primary" className="mb-4">
            Back to Homepage
          </Button>
        </Link>
      ) : (
        <ProductCarousel />
      )}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant={"danger"}>
          {" "}
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <h1>Latest Products</h1>
          <Meta title={`Welcome`} />
          <Row>
            {data.products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={data.pages}
            page={data.page}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;
