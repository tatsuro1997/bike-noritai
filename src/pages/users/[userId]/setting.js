import { useRouter } from "next/router";
import ProfileForm from "@/components/profile/profile-form";
import { getAllUsers, getUserById } from "@/helpers/user-api-util";

const UserSetting = ({ selectedUser: user }) => {
  const route = useRouter();

  const updateProfileHandler = async (userData) => {
    await fetch("/api/user/change-user-data", {
      method: "PATCH",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    route.back();
  };

  return (
    <>
      <h1>ユーザー設定</h1>
      <ProfileForm onUpdateProfile={updateProfileHandler} user={user} />
    </>
  );
};

export const getStaticProps = async (context) => {
  const userId = context.params.userId;
  const user = await getUserById(userId);

  return {
    props: {
      selectedUser: user,
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

export default UserSetting;
