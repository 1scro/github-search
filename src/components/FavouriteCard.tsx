import React from "react";
import { IFavourit } from "../models/models";
import { useActions } from "../hooks/actions";

function FavouriteCard({ favourite }: { favourite: IFavourit }) {
  const { removeFavourite } = useActions();

  const removeFromFavourite = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    removeFavourite(favourite.html_url);
  };

  const dateCreated = new Date(favourite.created_at).toLocaleDateString();
  const dateUpdated = new Date(favourite.pushed_at).toLocaleDateString();

  return (
    <div className="w-full mb-3 border border-gray-400 rounded hover:shadow-md hover:bg-gray-100 transition-all">
      <a
        href={favourite.html_url}
        className="block py-3 px-5"
        target="_blank"
        rel="noreferrer"
      >
        <div className="flex justify-between gap-2.5 min-h-[68px]">
          <div>
            <h2 className="text-lg font-bold">{favourite.full_name}</h2>
            <p className="mb-2 text-sm">{favourite?.description}</p>
            <div className="mb-2 text-sm">
              <p>
                <span className="font-medium">- Created: </span>
                {dateCreated}
              </p>
              <p>
                <span className="font-medium">- Last updated: </span>
                {dateUpdated}
              </p>
            </div>
          </div>

          <div>
            <button onClick={removeFromFavourite}>
              <svg
                width="30px"
                height="30px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="hover:scale-110"
              >
                <g id="SVGRepo_iconCarrier">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M6.30958 3.54424C7.06741 2.56989 8.23263 2 9.46699 2H20.9997C21.8359 2 22.6103 2.37473 23.1614 2.99465C23.709 3.61073 23.9997 4.42358 23.9997 5.25V18.75C23.9997 19.5764 23.709 20.3893 23.1614 21.0054C22.6103 21.6253 21.8359 22 20.9997 22H9.46699C8.23263 22 7.06741 21.4301 6.30958 20.4558L0.687897 13.2279C0.126171 12.5057 0.126169 11.4943 0.687897 10.7721L6.30958 3.54424ZM10.2498 7.04289C10.6403 6.65237 11.2734 6.65237 11.664 7.04289L14.4924 9.87132L17.3208 7.04289C17.7113 6.65237 18.3445 6.65237 18.735 7.04289L19.4421 7.75C19.8327 8.14052 19.8327 8.77369 19.4421 9.16421L16.6137 11.9926L19.4421 14.8211C19.8327 15.2116 19.8327 15.8448 19.4421 16.2353L18.735 16.9424C18.3445 17.3329 17.7113 17.3329 17.3208 16.9424L14.4924 14.114L11.664 16.9424C11.2734 17.3329 10.6403 17.3329 10.2498 16.9424L9.54265 16.2353C9.15212 15.8448 9.15212 15.2116 9.54265 14.8211L12.3711 11.9926L9.54265 9.16421C9.15212 8.77369 9.15212 8.14052 9.54265 7.75L10.2498 7.04289Z"
                    fill="#FF0000"
                  />
                </g>
              </svg>
            </button>
          </div>
        </div>

        <ul className="flex flex-col items-start space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
          <li className="flex text-sm leading-none text-gray-900">
            <div className="flex items-center px-3 py-1 space-x-2 bg-gray-200 border border-gray-400 rounded-l-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-gray-700"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="font-bold">Stars</span>
            </div>
            <span className="flex items-center -ml-px px-3 py-2 font-semibold border border-gray-400 rounded-r-md">
              {favourite.stargazers_count}
            </span>
          </li>
          <li className="flex text-sm leading-none text-gray-900">
            <div className="flex items-center px-3 py-1 space-x-2 bg-gray-200 border border-gray-400 rounded-l-md">
              <svg
                width="20px"
                height="20px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  stroke="#CCCCCC"
                  strokeWidth="0.096"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M7 5C7 3.89543 7.89543 3 9 3C10.1046 3 11 3.89543 11 5C11 5.74028 10.5978 6.38663 10 6.73244V14.0396H11.7915C12.8961 14.0396 13.7915 13.1441 13.7915 12.0396V10.7838C13.1823 10.4411 12.7708 9.78837 12.7708 9.03955C12.7708 7.93498 13.6662 7.03955 14.7708 7.03955C15.8753 7.03955 16.7708 7.93498 16.7708 9.03955C16.7708 9.77123 16.3778 10.4111 15.7915 10.7598V12.0396C15.7915 14.2487 14.0006 16.0396 11.7915 16.0396H10V17.2676C10.5978 17.6134 11 18.2597 11 19C11 20.1046 10.1046 21 9 21C7.89543 21 7 20.1046 7 19C7 18.2597 7.4022 17.6134 8 17.2676V6.73244C7.4022 6.38663 7 5.74028 7 5Z"
                    fill="#000000"
                  ></path>
                </g>
              </svg>
              <span className="font-bold">Forks</span>
            </div>
            <span className="flex items-center -ml-px px-3 py-2 font-semibold border border-gray-400 rounded-r-md">
              {favourite.forks}
            </span>
          </li>
          <li className="flex text-sm leading-none text-gray-900">
            <div className="flex items-center px-3 py-1 space-x-2 bg-gray-200 border border-gray-400 rounded-l-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-gray-700"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path
                  fillRule="evenodd"
                  d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="font-bold">Watchers</span>
            </div>
            <span className="flex items-center -ml-px px-3 py-2 font-semibold border border-gray-400 rounded-r-md">
              {favourite.watchers}
            </span>
          </li>
        </ul>
      </a>
    </div>
  );
}

export default FavouriteCard;
