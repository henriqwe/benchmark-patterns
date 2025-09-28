import React from "react";

// Componente "burro" (UI apenas)

function UserList({ users }) {
  return (
    <ul>
      {users.map((user) => (
        <li key={user.name}>{user.name}</li>
      ))}
    </ul>
  );
}

// Componente "inteligente"
export function PresentationalAndContainerPattern() {
  const users = useFetchUsers();
  return <UserList users={users} />;
}

function useFetchUsers() {
  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    function fakePromise() {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([{ name: "Alice" }, { name: "Bob" }, { name: "Charlie" }]);
        }, 1000);
      });
    }

    fakePromise().then(setUsers);
  }, []);

  return users;
}
