export async function getAllUsers() {
  let users;

  await fetch("http://localhost:3000/api/users/")
    .then((response) => response.json())
    .then((data) => {
      users = data.users;
    });

  return users;
}

export async function getUserById(id) {
  const allUsers = await getAllUsers();
  return allUsers.find((user) => user.uid === Number(id));
}
