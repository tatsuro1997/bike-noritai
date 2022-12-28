import Head from "next/head";
import { getAllUsers } from "../../helpers/user-api-util";
import UserList from "../../components/users/user-list";

const UserPage = ({ users }) => (
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

export const getStaticProps = async() => {
  const users = await getAllUsers();

  return {
    props: {
      users,
    },
    revalidate: 60,
  };
}

export default UserPage;
