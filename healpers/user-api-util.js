export async function getAllUsers() {
  const response = await fetch(
    "https://nextjs-course-dd497-default-rtdb.firebaseio.com/events.json"
    // 投稿データはmongoDBまたはスプシに置き換え要検討
  );
  const data = await response.json();

  const users = [];

  for (const key in data) {
    users.push({
      id: key,
      ...data[key],
    });
  }

  return users;
}

export async function getFeaturedUsers() {
  const allUsers = await getAllUsers();
  return allUsers.filter((user) => user.isFeatured);
}

export async function getUserById(id) {
  const allUsers = await getAllUsers();
  return allUsers.find((user) => user.id === id);
}

export async function getFilteredUsers(dateFilter) {
  const { year, month } = dateFilter;

  const allUsers = await getAllUsers();

  let filteredUsers = allUsers.filter((spot) => {
    const spotDate = new Date(spot.date);
    return (
      spotDate.getFullYear() === year && spotDate.getMonth() === month - 1
    );
  });

  return filteredUsers;
}
