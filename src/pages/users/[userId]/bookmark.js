import Head from "next/head";

import { getAllUsers, getUserById } from "../../../helpers/user-api-util";
import TabCard from "../../../components/tab/tab-content";
import BookmarkList from "../../../components/bookmark/bookmark-list";
import { getBookmarkByUserId } from "../../../helpers/bookmark-api-util";

function Bookmark({ user, bookmarks }) {
  return (
    <>
      <Head>
        <title>バイクノリタイ - イキタイリスト</title>
        <meta
          name="description"
          constent="Find a lot of great spots that allow you to evolve..."
        />
      </Head>
      <TabCard user={user} />
      <BookmarkList bookmarks={bookmarks} />
    </>
  );
}

export async function getStaticProps(context) {
  const userId = context.params.userId;

  const user = await getUserById(userId);

  const bookmarks = await getBookmarkByUserId(userId)

  return {
    props: {
      user,
      bookmarks,
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

export default Bookmark;
