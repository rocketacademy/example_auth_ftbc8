import React from "react";
import { Link } from "react-router-dom";

import ListingPreviewList from "./ListingPreviewList";

const Home = () => {
  return (
    <div>
      <Link to="/listings/new">Sell</Link>
      <br />
      <br />
      <ListingPreviewList />
    </div>
  );
};

export default Home;
