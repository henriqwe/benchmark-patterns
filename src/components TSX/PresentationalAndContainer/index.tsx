import React from "react";

// Componente "burro" (UI apenas)
type User = { name: string };

function UserList({ users }: { users: User[] }) {
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
  const [users, setUsers] = React.useState<User[]>([]);

  React.useEffect(() => {
    function fakePromise(): Promise<User[]> {
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
