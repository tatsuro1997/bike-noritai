import Head from "next/head";
import { useEffect, useState } from "react";

import UserList from "../../components/users/user-list";

function UserPage() {
  const [users, setUsers] = useState([]);
  const [isFeatchingUsers, setIsFeatchingUsers] = useState(false);

  useEffect(() => {
    setIsFeatchingUsers(true);
    fetch("/api/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data.users);
        setIsFeatchingUsers(false);
      });
  }, []);

  return (
    <>
      <Head>
        <title>バイクノリタイ - ユーザー一覧</title>
        <meta
          name="description"
          constent="Find a lot of great spots that allow you to evolve..."
        />
      </Head>
      <h1>User Page</h1>
      <h2>管理者のみアクセスできる様にする</h2>
      {isFeatchingUsers && <p>Loading...</p>}
      {!isFeatchingUsers && <UserList items={users} />}
    </>
  );
}

export default UserPage;
