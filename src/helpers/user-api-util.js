export const getAllUsers = async() => {
  const url = `${process.env.NEXT_PUBLIC_FETCH_URL}/api/users/`;

  try {
    const response = await fetch(url);
    const { users } = await response.json();

    return users;
  } catch (error) {
    console.log(error);
    return;
  }
}

export const getUserById = async (id) => {
  const allUsers = await getAllUsers();
  return allUsers.find((user) => user.uid === Number(id));
}
