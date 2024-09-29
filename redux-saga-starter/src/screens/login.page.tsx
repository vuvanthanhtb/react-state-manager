import { useState } from "react";
import { Link } from "react-router-dom";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import FloatingLabel from "react-bootstrap/FloatingLabel";

import { useAppDispatch } from "@/redux/hooks";
import { loginPending } from "@/redux/user";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useAppDispatch();

  const handleSubmit = () => {
    if (!email) {
      alert("Empty email @@");
      return;
    }
    if (!password) {
      alert("Empty password @@");
      return;
    }
    dispatch(loginPending({ email, password }));
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col xs={12} md={4}>
          <FloatingLabel
            controlId="floatingInput"
            label="Email address"
            className="mb-3"
          >
            <Form.Control
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingPassword" label="Password">
            <Form.Control
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
            />
          </FloatingLabel>
          <Button
            variant="primary"
            type="submit"
            className="mt-3"
            onClick={() => handleSubmit()}
          >
            Submit
          </Button>
          <Button variant="primary" disabled className="mt-3">
            <Spinner
              as="span"
              animation="border"
              variant="warning"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            &nbsp; Processing...
          </Button>
        </Col>
        <Col xs={12} className="mt-5">
          <Link to={"/"}>&lt;= Back home</Link>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
