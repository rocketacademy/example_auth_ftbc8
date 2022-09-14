import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./components/App";
import Home from "./components/Home";
import NewListingForm from "./components/NewListingForm";
import Listing from "./components/Listing";

import { Auth0Provider } from "@auth0/auth0-react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Auth0Provider
    domain={process.env.REACT_APP_DOMAIN}
    clientId={process.env.REACT_APP_CLIENT_ID}
    redirectUri={process.env.REACT_APP_REDIRECT}
    audience={process.env.REACT_APP_AUDIENCE}
    scope={process.env.REACT_APP_SCOPE}
  >
    <BrowserRouter>
      <Routes>
        {/* Route that provides base app UI */}
        <Route path="/" element={<App />}>
          {/* Route that renders home content */}
          <Route index element={<Home />} />
          {/* Route that renders new listing form */}
          <Route path="listings/new" element={<NewListingForm />} />
          {/* Route that renders individual listings */}
          <Route path="listings/:listingId" element={<Listing />} />
          {/* Route that matches all other paths */}
          <Route path="*" element={"Nothing here!"} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Auth0Provider>
);
