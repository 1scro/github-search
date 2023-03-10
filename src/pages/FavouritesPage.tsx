import React from "react";
import { useAppSelector } from "../hooks/redux";
import FavouriteCard from "../components/FavouriteCard";

function FavouritesPage() {
  const { favourites } = useAppSelector((state) => state.github);

  return (
    <div className="flex justify-center pt-16 pb-6">
      <div className="w-[560px] px-[16px]">
        <div className="flex items-center justify-center mb-8 max-sm:items-start">
          <div>
            <svg
              className="w-10 h-12"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fill="#3f3f46"
            >
              <g>
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M13 21v2.5l-3-2-3 2V21h-.5A3.5 3.5 0 0 1 3 17.5V5a3 3 0 0 1 3-3h14a1 1 0 0 1 1 1v17a1 1 0 0 1-1 1h-7zm-6-2v-2h6v2h6v-3H6.5a1.5 1.5 0 0 0 0 3H7zM7 5v2h2V5H7zm0 3v2h2V8H7zm0 3v2h2v-2H7z" />
              </g>
            </svg>
          </div>
          <h2 className="text-3xl font-medium text-zinc-700">
            Favourites repositories
          </h2>
        </div>
        <div className="container flex flex-col items-center">
          {favourites.length > 0 ? (
            favourites?.map((fav) => (
              <FavouriteCard favourite={fav} key={fav.html_url} />
            ))
          ) : (
            <div className="flex items-center gap-x-3 max-sm:self-start">
              <svg
                className="max-sm:ml-[4px]"
                width="30px"
                height="30px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 8.5H15.24"
                  stroke="#292D32"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6 16.5H7.29"
                  stroke="#292D32"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M11 16.5H14.5"
                  stroke="#292D32"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7.97998 20.4999H17.56C21.12 20.4999 22 19.6199 22 16.1099V6.88989"
                  stroke="#292D32"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M19.99 3.75C19.37 3.57 18.57 3.5 17.56 3.5H6.44C2.89 3.5 2 4.38 2 7.89V16.1C2 18.44 2.39 19.61 3.71 20.13"
                  stroke="#292D32"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M22 2L2 22"
                  stroke="#292D32"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="text-lg">Nothing</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FavouritesPage;
