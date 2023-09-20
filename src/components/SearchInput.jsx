import React, { useState } from "react";
import axios from "axios";
import { UsersList } from "./UsersList";
import { useQuery } from "react-query";

export const SearchInput = () => {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);

  const { isLoading, isError } = useQuery(
    "example",
    async () => {
      if (query) {
        const response = await axios.get(
          `https://api.github.com/search/users?q=${query}`
        );
        return response.data.items;
      }
      return [];
    },
    {
      onSuccess: (data) => {
        setUsers(data);
      },
    }
  );

  if (isLoading) {
    return (
      <div className="flex justify-center pt-20">
        <p className="text-neutral-400 text-lg font-bold">Loading...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center pt-20">
        <p className="text-rose-500 text-2xl font-bold">
          An error occurred while fetching the data.
        </p>
      </div>
    );
  }

  const handleSearch = () => {
    query && setUsers([]);
  };

  return (
    <>
      <div className="flex justify-center my-10">
        <div className="flex items-center justify-between bg-neutral-500 px-3 py-1 rounded-md">
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="username"
            className="bg-transparent outline-none text-neutral-900 text-lg placeholder:text-neutral-900 placeholder:text-lg"
          />
          <button onClick={handleSearch}>
            <img src="/icons/search.svg" />
          </button>
        </div>
      </div>

      <div className="flex justify-center">
        {users.length > 0 && <UsersList users={users} />}
      </div>
    </>
  );
};
