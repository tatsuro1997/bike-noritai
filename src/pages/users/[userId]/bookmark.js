import Head from "next/head";
import { getAllUsers, getUserById } from "@/helpers/user-api-util";
import { getBookmarkByUserId } from "@/helpers/bookmark-api-util";
import TabCard from "@/components/tab/tab-content";
import BookmarkList from "@/components/bookmark/bookmark-list";

const Bookmark = ({ user, bookmarks }) => (
  <>
    <Head>
      <title>バイクノリタイ - イキタイリスト</title>
      <meta
        name="description"
        content="Find a lot of great spots that allow you to evolve..."
      />
    </Head>
    <TabCard user={user} />
    <BookmarkList bookmarks={bookmarks} />
  </>
);

export const getStaticProps = async (context) => {
  const userId = context.params.userId;
  const user = await getUserById(userId);
  const bookmarks = await getBookmarkByUserId(userId);

  return {
    props: {
      user,
      bookmarks,
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

export default Bookmark;
