import React from "react";
import Card from "react-bootstrap/Card";

const ListingPreview = (props) => {
  return (
    <Card bg="dark">
      <Card.Body>
        <Card.Title>{props.data.title}</Card.Title>
      </Card.Body>
    </Card>
  );
};

export default ListingPreview;
