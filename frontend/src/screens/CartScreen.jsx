import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import Message from "../components/Message";
import { addToCart, removeFromCart } from "../slices/cartSlice";
import { toast } from "react-toastify";

const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  console.log("userInfo", userInfo?.name);
  const { cartItems } = cart;

  const changeQuantityHandler = (qty, product) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (productId) => {
    dispatch(removeFromCart(productId));
    toast.success("removed from cart");
  };

  const checkoutHandler = () => {
    // console.log("checkout");
    navigate("/login?redirect=/shipping");
  };

  // console.log(cartItems);

  return (
    <Row>
      <Col md={8}>
        <h1 style={{ marginBottom: "20px" }}>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item._id}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item._id}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      as="select"
                      value={item.qty}
                      // onChange={(e) => setQty(Number(e.target.value))}
                      onChange={(e) =>
                        changeQuantityHandler(Number(e.target.value), item)
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((qty) => (
                        <option key={qty + 1} value={qty + 1}>
                          {qty + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={(e) => {
                        // console.log("delete");
                        removeFromCartHandler(item._id);
                      }}
                      style={{
                        backgroundColor: "red",
                      }}
                    >
                      <FaTrash
                      // style={{
                      //   color: "red",
                      // }}
                      />
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>
                Subtotal:
                {cartItems.reduce((acc, product) => acc + product.qty, 0)} items
              </h2>
              ${cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                className="btn-block"
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed to checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
