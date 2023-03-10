import React from "react";
import { IRepo } from "../models/models";
import { useActions } from "../hooks/actions";
import { useAppSelector } from "../hooks/redux";
import { useState } from "react";

function RepoCard({ repo }: { repo: IRepo }) {
  const { addFavourite, removeFavourite } = useActions();
  const { favourites } = useAppSelector((state) => state.github);

  const [isFav, setIsFav] = useState(
    Boolean(favourites.find((fav) => fav.html_url === repo.html_url))
  );

  const addToFavourite = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    addFavourite({
      html_url: repo.html_url,
      full_name: repo.full_name,
      forks: repo.forks,
      watchers: repo.watchers,
      description: repo.description,
      stargazers_count: repo.stargazers_count,
      created_at: repo.created_at,
      pushed_at: repo.pushed_at,
    });
    setIsFav(true);
  };

  const removeFromFavourite = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    removeFavourite(repo.html_url);
    setIsFav(false);
  };

  return (
    <div className="w-full mb-3 border border-gray-400 rounded hover:shadow-md hover:bg-gray-100 transition-all">
      <a
        href={repo.html_url}
        target="_blank"
        rel="noreferrer"
        className="block py-3 px-5"
      >
        <div className="flex justify-between gap-2.5 min-h-[68px]">
          <div>
            <h2 className="text-lg font-bold mb-1 break-all">
              {repo.full_name}
            </h2>

            <p className="text-sm">
              Stars:{" "}
              <span className="mr-2 font-bold">{repo.stargazers_count}</span>
              Forks: <span className="mr-2 font-bold">{repo.forks}</span>
              Watchers: <span className="font-bold">{repo.watchers}</span>
            </p>
            <p className="text-sm">{repo?.description}</p>
          </div>

          <div className="self-start">
            {!isFav && (
              <button
                className="block py-[6px] px-4 text-zinc-800 border border-zinc-400 font-semibold bg-yellow-400 rounded hover:shadow-md transition-all"
                onClick={addToFavourite}
              >
                Add
              </button>
            )}

            {isFav && (
              <button
                className="block py-[6px] px-4 text-zinc-800 border border-zinc-400 font-semibold bg-red-400 hover:bg-red-500 rounded hover:shadow-md transition-all"
                onClick={removeFromFavourite}
              >
                Remove
              </button>
            )}
          </div>
        </div>
      </a>
    </div>
  );
}

export default RepoCard;
