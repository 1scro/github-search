import React, { useEffect, useState } from "react";
import RepoCard from "../components/RepoCard";
import { useDebounce } from "../hooks/debounce";
import {
  useSearchUsersQuery,
  useLazyGetUserReposQuery,
} from "../store/github/github.api";
import { IRepo } from "../models/models";

function HomePage() {
  const [search, setSearch] = useState("");
  const [dropdown, setDropDown] = useState(false);
  const [page, setPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState("");
  const [repos, setRepos] = useState<IRepo[]>([]);
  const [noMoreRepos, setNoMoreRepos] = useState(false);

  const debounced = useDebounce(search);
  const {
    isLoading,
    isError,
    data: users,
  } = useSearchUsersQuery(debounced, {
    skip: debounced.length < 3,
    refetchOnFocus: true,
  });

  const [fetchRepos, { isLoading: areReposLoading, data }] =
    useLazyGetUserReposQuery();

  //Функция обработчик при клике на имя пользователя GitHub
  const clickHandler = (username: string) => {
    fetchRepos({ username, page: 1 });
    setSelectedUser(username);
    setSearch(search);
    setPage(1);
    setNoMoreRepos(false);
    setDropDown(false);

    //Обновить список репозиториев при выборе нового пользователя
    if (username !== selectedUser) {
      setRepos([]);
    }
  };

  const selectNextPage = (username: string, page: number) => {
    if (!noMoreRepos) {
      fetchRepos({ username, page });
      setPage(page);
    }
  };

  useEffect(() => {
    setDropDown(debounced.length > 3 && users?.length! > 0);
  }, [debounced, users]);

  useEffect(() => {
    if (data?.length) {
      setRepos((prev) => [...prev, ...data]);
    } else {
      setNoMoreRepos(true);
    }
  }, [data]);

  return (
    <div
      className="flex justify-center pt-16"
      onClick={() => setDropDown(false)}
    >
      {isError && (
        <p className="text-center text-red-600">Something went wrong...</p>
      )}

      <div className="relative w-[560px] px-[16px]">
        <div className="mb-[20px] text-center">
          <svg
            width="58"
            height="56"
            viewBox="0 0 98 96"
            className="inline-block hover:scale-110 transition-all"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
              fill="#24292f"
            />
          </svg>
        </div>
        <input
          type="text"
          value={search}
          className="w-full h-[42px] mb-1 py-2 px-4 border-2 border-zinc-400 rounded hover:border-zinc-600 transition-all"
          placeholder="Search for Github username..."
          onChange={(e) => setSearch(e.target.value)}
        />

        {dropdown && (
          <ul className="list-none absolute left-0 right-0 max-h-[200px] mx-[14px] overflow-y-scroll shadow-md border bg-white">
            {isLoading && <p className="text-center">Loading...</p>}
            {users?.map((user) => (
              <li
                key={user.id}
                onClick={() => clickHandler(user.login)}
                className="py-2 px-4 hover:bg-gray-500 hover:text-white transition-colors cursor-pointer"
              >
                {user.login}
              </li>
            ))}
          </ul>
        )}
        {!selectedUser && (
          <div className="flex justify-center w-full mt-[74px]">
            <ol className="max-w-[380px] p-2 space-y-3 text-zinc-700 text-lg list-decimal list-inside border-2 border-dashed border-zinc-400 rounded">
              <li className="mb-4 flex">
                <span className="mr-2 flex h-6 w-full max-w-[24px] items-center justify-center rounded bg-zinc-700 text-white">
                  1
                </span>
                <i>
                  Write and select the <b>GitHub username</b>;
                </i>
              </li>
              <li className="mb-4 flex">
                <span className="mr-2 flex h-6 w-full max-w-[24px] items-center justify-center rounded bg-zinc-700 text-white">
                  2
                </span>
                <i>
                  Select your favourite repository by clicking <b>"Add"</b>;
                </i>
              </li>
              <li className="mb-4 flex">
                <span className="mr-2 flex h-6 w-full max-w-[24px] items-center justify-center rounded bg-zinc-700 text-white">
                  3
                </span>
                <i>
                  Go to the <b>"Favourites"</b> tab to see the repositories you
                  are tracking.
                </i>
              </li>
            </ol>
          </div>
        )}
        <div className="container flex flex-col items-center mt-4 mb-6">
          {areReposLoading && <p className="text-center">Repos are loading</p>}
          {repos?.map((repo) => (
            <RepoCard repo={repo} key={repo.id} />
          ))}
          {!noMoreRepos && (
            <div className="mt-[20px]">
              <button
                className="block w-[110px] px-5 py-2.5 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-full text-sm text-center dark:bg-blue-600 dark:hover:bg-blue-700"
                onClick={() => selectNextPage(selectedUser, page + 1)}
              >
                Load More
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
