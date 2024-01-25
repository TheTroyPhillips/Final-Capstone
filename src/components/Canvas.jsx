import { Offcanvas } from "react-bootstrap";

export default function Canvas({ handleClose, show, products, setProducts }) {
    return (
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Filter</Offcanvas.Title>
        </Offcanvas.Header>
      </Offcanvas>
    );
  }