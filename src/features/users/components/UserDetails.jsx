


const [users, setUsers] = useState([]);

useEffect(() => {
  fetchUsers();
}, []);

const fetchUsers = async () => {
  try {
    const response = await getUsers();
    setUsers(response.data);
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};

const handleAddUser = async (user) => {
  try {
    await addUser(user);
    fetchUsers();
  } catch (error) {
    console.error(error);
  }
};

const handleEditUser = async (id, user) => {
  try {
    await updateUser(id, user);
    fetchUsers();
  } catch (error) {
    console.error(error);
  }
};

export default UserDetails;