import React, { useState, useEffect } from "react";
import data from "../utils/data.json";
import { Container, Form, Button, Row, Col } from "react-bootstrap";

function ItemDropdown() {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(0);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    // Load data from JSON
    setItems(data);
  }, []);

  const handleItemChange = (event) => {
    const itemId = parseInt(event.target.value);
    const item = items.find((i) => i.itemid === itemId);
    setSelectedItem(item);
    setSelectedQuantity(0);
  };

  const handleQuantityChange = (event) => {
    setSelectedQuantity(parseInt(event.target.value));
  };

  const handleSubmit = () => {
    if (selectedItem && selectedQuantity > 0) {
      const updatedItems = items.map((item) => {
        if (item.itemid === selectedItem.itemid) {
          if (item.quantity - selectedQuantity >= 0) {
            return { ...item, quantity: item.quantity - selectedQuantity };
          } else {
            return { ...item, quantity: 0 };
          }
        }
        return item;
      });
      setItems(updatedItems);
    } else {
      alert("Please select an item and quantity");
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <h1 className="text-center mb-4">Item Selection</h1>
          <Form>
            <Form.Group controlId="itemSelect">
              <Form.Label>Select an item: </Form.Label>
              <Form.Control
                as="select"
                onChange={handleItemChange}
                className="mb-3"
              >
                <option value="">Select an item</option>
                {items.map((item) => (
                  <option key={item.itemid} value={item.itemid}>
                    {item.itemname} (Available: {item.quantity})
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <br></br>

            {selectedItem && (
              <>
                <Form.Group controlId="quantityInput">
                  <Form.Label>Quantity: </Form.Label>
                  <Form.Control
                    type="number"
                    min="1"
                    max={selectedItem.quantity}
                    value={selectedQuantity}
                    onChange={handleQuantityChange}
                    className="mb-3"
                  />
                </Form.Group>
                <br />
                <Button variant="primary" onClick={handleSubmit} block>
                  Submit
                </Button>
              </>
            )}
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default ItemDropdown;
