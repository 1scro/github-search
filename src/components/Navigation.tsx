import * as React from "react";
import { Link } from "react-router-dom";

function Navigation() {
  return (
    <nav className="flex justify-between items-center gap-2.5 h-[60px] px-5 shadow-md bg-zinc-700 text-white">
      <h2 className="text-xl font-bold">
        <Link to="github-search/">GitHub Search</Link>
      </h2>

      <span className="text-lg">
        <Link to="github-search/" className="mr-4 hover:underline">
          Home
        </Link>
        <Link to="github-search/favourites" className="hover:underline">
          Favourites
        </Link>
      </span>
    </nav>
  );
}

export default Navigation;
