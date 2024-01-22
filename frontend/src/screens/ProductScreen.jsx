import { useParams, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
// import axios from "axios";
// import { useEffect, useState } from "react";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import { useGetProductDetailsQuery } from "../slices/productsApiSlice";
import { addToCart } from "../slices/cartSlice";

const ProductScreen = () => {
  // const [product, setProduct] = useState([]);
  const [qty, setQty] = useState(1);
  const { id: productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productId);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

  // console.log(products);
  // console.log("productId", productId);
  // const fetchProduct = async () => {
  //   const { data } = await axios.get(`/api/products/${productId}`);
  //   console.log("data", data);
  //   setProduct(data);
  // };
  // useEffect(() => {
  //   fetchProduct();
  // }, [productId]);
  // const product = products.find((product) => product._id === productId);
  console.log("product", product);
  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      {/* <p>{JSON.stringify(product)}</p> */}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <h1>{error?.data?.message || error.error}</h1>
      ) : (
        <Row>
          <Col md={5}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col md={4}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
              </ListGroup.Item>
              <ListGroup.Item>
                {" "}
                <strong>Description: </strong> {product.description}
              </ListGroup.Item>
              <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup>
                <ListGroup.Item>
                  <Row>
                    {" "}
                    <Col>Price:</Col>{" "}
                    <Col>
                      <strong>${product.price}</strong>{" "}
                    </Col>{" "}
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    {" "}
                    <Col>Status:</Col>{" "}
                    <Col>
                      <strong>
                        {product.countInStock > 0 ? `in stock` : `out of stock`}
                      </strong>{" "}
                    </Col>{" "}
                  </Row>
                </ListGroup.Item>
                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Quantity:</Col>
                      <Col>
                        <Form.Control
                          as="select"
                          value={qty}
                          onChange={(e) => setQty(Number(e.target.value))}
                        >
                          {[...Array(product.countInStock).keys()].map(
                            (qty) => (
                              <option key={qty + 1} value={qty + 1}>
                                {qty + 1}
                              </option>
                            )
                          )}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}
                <ListGroup.Item>
                  <Row>
                    {" "}
                    <Col>
                      <div className="d-grid gap-2">
                        <Button
                          className="btn-block"
                          type="button"
                          disabled={product.countInStock === 0}
                          onClick={addToCartHandler}
                        >
                          {product.countInStock > 0
                            ? `Add to cart`
                            : `not available`}
                        </Button>
                      </div>
                    </Col>{" "}
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ProductScreen;
