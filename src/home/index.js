import React from "react";
import { SearchInput } from "../components/SearchInput";

export const Home = () => {
  return (
    <>
      <div className="w-full h-screen">
        <div className="pt-20">
          <h1 className="text-center text-3xl text-neutral-100 font-semibold">
            You can search github users here
          </h1>
        </div>

        <SearchInput />
      </div>
    </>
  );
};
