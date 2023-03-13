import React from "react";
import {Label } from "@mui/icons-material";
import { Link } from "react-router-dom";
import supportRoute from "./supportRoute.js";

function Sidemenu() {
  const supports = supportRoute.map((route, i) => (
    <li>
      <Link
        to={route.url}
        class="flex items-center py-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100"
      >
        <Label sx={{ fontsize: 20 }} />
        <span class="ml-3">{route.name}</span>
      </Link>
    </li>
  ));
  return (
    <div className="">
      <h1 className="font-bold">Support</h1>
      <ul class="space-y-2">{supports}</ul>
    </div>
  );
}

export default Sidemenu;
