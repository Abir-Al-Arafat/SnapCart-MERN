import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";
import Rating from "../components/Rating";
import { useGetProductDetailsQuery } from "../slices/productsApiSlice";

const ProductScreen = () => {
  // const [product, setProduct] = useState([]);
  const { id: productId } = useParams();
  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productId);

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
        <h1>Loading....</h1>
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
                <ListGroup.Item>
                  <Row>
                    {" "}
                    <Col>
                      <div className="d-grid gap-2">
                        <Button
                          className="btn-block"
                          type="button"
                          disabled={product.countInStock === 0}
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
