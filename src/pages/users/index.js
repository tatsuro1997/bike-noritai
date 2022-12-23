import Head from "next/head";
import UserList from "../../components/users/user-list";
import { getAllUsers } from "../../helpers/user-api-util";

function UserPage({ users }) {

  return (
    <>
      <Head>
        <title>バイクノリタイ - ユーザー一覧</title>
        <meta
          name="description"
          content="Find a lot of great spots that allow you to evolve..."
        />
      </Head>
      <h1>User Page</h1>
      <h2>管理者のみアクセスできる様にする</h2>
      {!users && <p>Loading...</p>}
      {users && <UserList items={users} />}
    </>
  );
}

export async function getStaticProps() {
  const users = await getAllUsers();

  return {
    props: {
      users,
    },
    revalidate: 60,
  };
}

export default UserPage;
