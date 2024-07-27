import React from "react";
import { useFetchUserQuery } from "./usersApiSlice.js";

const Users = () => {
  const { data: users, error, isLoading } = useFetchUserQuery();

  if (isLoading) return <h3>Loading...</h3>;
  if (error) return <h3>Error: {error.message}</h3>;

  return (
    <div>
      {users &&
        users.map((user) => (
          <div className="px-4" key={user.id}>
            <ul>
              <li className="uppercase font-bold">{user.userName}</li>
              <li>{user.email}</li>
            </ul>
          </div>
        ))}
    </div>
  );
};

export default Users;
