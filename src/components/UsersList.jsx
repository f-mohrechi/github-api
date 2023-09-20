import React from "react";

export const UsersList = ({ users }) => {
  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>
          <a href={`/${user.login}`} className="flex items-center py-3">
            <div className=" w-16 h-16">
              <img className="rounded-full" src={user.avatar_url} />
            </div>
            <p className="text-neutral-200 pl-4 text-lg font-medium">
              {user.login}
            </p>
          </a>
        </div>
      ))}
    </div>
  );
};
