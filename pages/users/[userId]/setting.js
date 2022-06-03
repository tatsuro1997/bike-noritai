import ProfileForm from "../../../components/profile/profile-form";
import { getAllUsers, getUserById } from "../../../helpers/user-api-util";

function UserSetting(props) {
  const user = props.selectedUser;

  async function updateProfileHandler(userData) {
    const response = await fetch("/api/user/change-user-data", {
      method: "PATCH",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    console.log(data);
  }

  return (
    <>
      <h1>ユーザー設定</h1>
      <ProfileForm
        onUpdateProfile={updateProfileHandler}
        id={user.uid}
        area={user.area}
        prefecture={user.prefecture}
        experience={user.experience}
        bike_name={user.bike_name}
        url={user.url}
      />
    </>
  );
}

export async function getStaticProps(context) {
  const userId = context.params.userId;

  const user = await getUserById(userId);

  return {
    props: {
      selectedUser: user,
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

export default UserSetting;
