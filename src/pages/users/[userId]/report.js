import Head from "next/head";
import ReportList from "../../../components/reports/report-list";
import TabCard from "../../../components/tab/tab-content";
import { getRecordsByMonth } from "../../../helpers/record-api-util";
import { getAllUsers, getUserById } from "../../../helpers/user-api-util";

const ReportsPage = ({ thisMonthRecords, lastMonthRecords, user }) => (
  <>
    <Head>
      <title>バイクノリタイ - ツーリングレポート</title>
      <meta
        name="description"
        content="Find a lot of great spots that allow you to evolve..."
      />
    </Head>
    <TabCard user={user} />
    <ReportList
      thisMonthRecords={thisMonthRecords}
      lastMonthRecords={lastMonthRecords}
    />
  </>
);

export const getStaticProps = async(context) => {
  const userId = context.params.userId;
  const month = new Date().getMonth() + 1;
  const lastMonth = new Date().getMonth();

  const thisMonthRecords = await getRecordsByMonth(userId, month);
  const lastMonthRecords = await getRecordsByMonth(userId, lastMonth);
  const user = await getUserById(userId);

  return {
    props: {
      thisMonthRecords,
      lastMonthRecords,
      user,
    },
    revalidate: 60,
  };
}

export const getStaticPaths = async() => {
  const users = await getAllUsers();
  const paths = users.map((user) => ({
    params: { userId: user.uid.toString() },
  }));

  return {
    paths: paths,
    fallback: "blocking",
  };
}

export default ReportsPage;
