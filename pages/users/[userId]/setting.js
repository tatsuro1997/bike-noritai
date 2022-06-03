import ProfileForm from "../../../components/profile/profile-form";

function UserSetting() {
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
      <ProfileForm onUpdateProfile={updateProfileHandler} />
    </>
  );
}

export default UserSetting;
