import { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { changeMode } from "../redux/app/mode.slice";

function Header() {
  const dispatch = useAppDispatch();
  const mode = useAppSelector((state) => state.mode.mode);

  useEffect(() => {
    const body = document.querySelector("body");
    if (body) body.setAttribute("data-bs-theme", mode);
  }, [mode]);

  return (
    <Navbar className="bg-body-tertiary" data-bs-theme={mode}>
      <Container>
        <Navbar.Brand href="#home">React Query</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Form.Check
            defaultChecked={mode === "light" ? false : true}
            onChange={(e) => {
              dispatch(changeMode(e.target.checked ? "dark" : "light"));
            }}
            type="switch"
            id="custom-switch"
            label={
              mode === "light" ? (
                <Navbar.Text>Light mode</Navbar.Text>
              ) : (
                <Navbar.Text>Dark mode</Navbar.Text>
              )
            }
          />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
