import DataTable from "react-data-table-component";
import { useGetUsersQuery } from "../adminApiSlice.js";
import { useEffect, useState } from "react";
import Loader from "../../../Components/Loader/Loader.jsx";
import Button from "../../../Components/Button/Button.jsx";
import "../UserList/UserList.css";

const columns = [
  {
    name: "First Name",
    selector: (row) => row.firstName,
  },
  {
    name: "Last Name",
    selector: (row) => row.lastName,
  },
  {
    name: "Mobile",
    selector: (row) => row.mobile,
  },
  {
    name: "Profile Image",
    selector: (row) => row.profileImage,
  },
  {
    name: "Email",
    selector: (row) => row.email,
  },
  {
    name: "Action",
    cell: (row) => (
      <div>
        <Button className="readBtn Btn" onClick={() => handleRead(row.id)}>
          Read
        </Button>
        <Button className="editBtn Btn" onClick={() => handleEdit(row.id)}>
          Edit
        </Button>
        <Button className="deleteBtn Btn" onClick={() => handleDelete(row.id)}>
          Delete
        </Button>
      </div>
    ),
  },
];

const customStyles = {
  headCells: {
    style: {
      backgroundColor: "black",
      color: "white",
      fontSize: "17px",
      fontWeight: "bolder",
    },
  },
};

const handleRead = (id) => {
  console.log("Read user with ID:", id);
};

const handleEdit = (id) => {
  console.log("Edit user with ID:", id);
};
const handleDelete = (id) => {
  console.log("Delete user with ID:", id);
};

const UserList = () => {
  // Fetch user data
  const { data, isLoading } = useGetUsersQuery();
  const [userData, setUserData] = useState([]);
  console.log(userData, "userData");

  useEffect(() => {
    if (data?.user) {
      setUserData(data.user);
    }
  }, [data]);

  return (
    <div className="homeDiv">
      <div className="search">
        <h2>User List</h2>
        <input type="text" placeholder="Search By Title" />
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <DataTable
          columns={columns}
          data={userData}
          customStyles={customStyles}
          pagination
        />
      )}
    </div>
  );
};

export default UserList;
