import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import ListingPreview from "./ListingPreview";
import { BACKEND_URL } from "../constants.js";

const ListingPreviewList = () => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    axios.get(`${BACKEND_URL}/listings`).then((response) => {
      setListings(response.data);
    });
    // Only run this effect on component mount
  }, []);

  const listingPreviews = listings.map((listing) => (
    <Link to={`/listings/${listing.id}`} key={listing.id}>
      <ListingPreview data={listing} />
    </Link>
  ));

  return <div>{listingPreviews}</div>;
};

export default ListingPreviewList;
