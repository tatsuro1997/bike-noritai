import Head from "next/head";
import { getAllUsers, getUserById } from "../../../helpers/user-api-util";
import TabCard from "../../../components/tab/tab-content";
import RegisteredSpotList from "../../../components/registered_spots/registered_spot-list";
import { getSpotByUid } from "../../../helpers/spot-api-util";

const RegisteredSpots = ({ user, registered_spots }) => (
  <>
    <Head>
      <title>バイクノリタイ - 登録スポット</title>
      <meta
        name="description"
        content="Find a lot of great spots that allow you to evolve..."
      />
    </Head>
    <TabCard user={user} />
    <RegisteredSpotList spots={registered_spots} />
  </>
);

export const getStaticProps = async (context) => {
  const userId = context.params.userId;
  const user = await getUserById(userId);
  const registered_spots = await getSpotByUid(userId);

  return {
    props: {
      user,
      registered_spots,
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

export default RegisteredSpots;
