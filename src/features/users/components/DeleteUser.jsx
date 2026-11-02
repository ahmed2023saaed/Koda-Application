

const handleDeleteUser = async (id) => {
  try {
    await deleteUser(id);
    fetchUsers();
  } catch (error) {
    console.error(error);
  }
};

export default DeleteUser;