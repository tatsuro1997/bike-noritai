import Head from "next/head";
import ReportList from "../../../components/reports/report-list";
import { getRecordsByMonth } from "../../../helpers/record-api-util";
import { getAllUsers } from "../../../helpers/user-api-util";

function ReportsPage(props) {
  const { thisMonthRecords, lastMonthRecords } = props;

  return (
    <>
      <Head>
        <title>バイクノリタイ - ツーリングレポート</title>
        <meta
          name="description"
          constent="Find a lot of great spots that allow you to evolve..."
        />
      </Head>
      <ReportList
        thisMonthRecords={thisMonthRecords}
        lastMonthRecords={lastMonthRecords}
      />
    </>
  );
}

export async function getStaticProps(context) {
  const userId = context.params.userId;
  const month = new Date().getMonth() + 1;
  const lastMonth = new Date().getMonth();

  const thisMonthRecords = await getRecordsByMonth(userId, month);
  const lastMonthRecords = await getRecordsByMonth(userId, lastMonth);

  return {
    props: {
      thisMonthRecords,
      lastMonthRecords,
    },
    revalidate: 60,
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

export default ReportsPage;
