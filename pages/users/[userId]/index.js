import Head from "next/head";

import UserProfile from "../../../components/profile/user-profile";
import RecordList from "../../../components/records/record-list";
import { getRecordsByUid } from "../../../helpers/record-api-util";
import { getAllUsers, getUserById } from "../../../helpers/user-api-util";

function UserDetailPage(props) {
  const user = props.selectedUser;
  const records = props.records;

  if (!user) {
    return (
      <div className="center">
        <p>Loading...</p>
      </div>
    );
  }

  const humanReadableDate = new Date(user.created_at).toLocaleDateString(
    "ko-KR",
    {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    }
  );

  return (
    <>
      <Head>
        <title>〇〇さんのマイページ</title>
        <meta
          name="description"
          constent="〇〇さんのマイページ。イキタイスポットを見つけましょう！"
        />
      </Head>
      <UserProfile
        id={user.uid}
        name={user.name}
        area={user.area}
        prefecture={user.prefecture}
        experience={user.experience}
        bike_name={user.bike_name}
        url={user.url}
        created_at={humanReadableDate}
      />
      <RecordList items={records} />
      <h2>登録スポット</h2>
    </>
  );
}

export async function getStaticProps(context) {
  const userId = context.params.userId;

  const user = await getUserById(userId);

  const myRecords = await getRecordsByUid(userId);

  return {
    props: {
      selectedUser: user,
      records: myRecords,
    },
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  const users = await getAllUsers();

  const paths = users.map((user) => ({
    params: { userId: user.uid.toString() },
  }));

  return {
    paths: paths,
    fallback: "blocking",
  };
}

export default UserDetailPage;
