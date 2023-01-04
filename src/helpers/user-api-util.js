export const getAllUsers = async () => {
  const url = `${process.env.NEXT_PUBLIC_FETCH_URL}/api/users/`;

  try {
    const response = await fetch(url);
    if (response.status === 200) {
      const { users } = await response.json();

      return users;
    } else {
      throw new Error("ユーザーデータの取得に失敗しました。");
    }
  } catch (error) {
    console.log(error);
  }
};

export const getUserById = async (id) => {
  const allUsers = await getAllUsers();

  return allUsers.find((user) => user.uid === Number(id));
};
