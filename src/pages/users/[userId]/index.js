import Head from "next/head";
import UserProfile from "@/components/profile/user-profile";
import RecordList from "@/components/records/record-list";
import TabList from "@/components/tab/tab-list";
import { getRecordsByUid, getRecordsByMonth } from "@/helpers/record-api-util";
import { getAllUsers, getUserById } from "@/helpers/user-api-util";

const UserDetailPage = ({ selectedUser: user, records, thisMonthRecords }) => {
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
        {user && <title>{user.name}さんのマイページ</title>}
        {!user && <title>バイクノリタイ - マイページ</title>}
        <meta
          name="description"
          content="バイクノリタイ - マイページ。イキタイスポットを見つけましょう！"
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
        thisMonthRecords={thisMonthRecords}
      />
      <TabList user={user} />
      <RecordList items={records} />
    </>
  );
};

export const getStaticProps = async (context) => {
  const userId = context.params.userId;
  const month = new Date().getMonth() + 1;

  const user = await getUserById(userId);

  const myRecords = await getRecordsByUid(userId);

  const thisMonthRecords = await getRecordsByMonth(userId, month);

  return {
    props: {
      selectedUser: user,
      records: myRecords,
      thisMonthRecords,
    },
    revalidate: 30,
  };
};

export const getStaticPaths = async () => {
  const users = await getAllUsers();

  const paths = users.map((user) => ({
    params: { userId: user.uid.toString() },
  }));

  return {
    paths: paths,
    fallback: "blocking",
  };
};

export default UserDetailPage;
