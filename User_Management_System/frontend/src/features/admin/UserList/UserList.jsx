import DataTable from "react-data-table-component";
import { useGetUsersQuery } from "../adminApiSlice.js";
import { useEffect, useState } from "react";
import Loader from "../../../Components/Loader/Loader.jsx";
import Button from "../../../Components/Button/Button.jsx";
import "../UserList/UserList.css";
// import { toast } from "react-toastify";
import {
  openAddNewUserModal,
  closeAddNewUserModal,
} from "../../modal/modalSlice.js";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../../Components/modal/Modal.jsx";
import AddNewUser from "../AddNewUser.jsx";

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
    cell: (row) => (
      row.profileImage ? (
        <img
          src={row.profileImage}
          alt={`${row.firstName[0]} ${row.lastName[0]}`}
          width="50"
          height="50"
          style={{ borderRadius: "100%" }}
        />
      ) : (
        <div className="initials ">
        {`${row.firstName[0]}${row.lastName[0]}`}
      </div>
      )
    ),
  },
  {
    name: "Email",
    selector: (row) => row.email,
  },
  {
    name: "Action",
    cell: (row) => (
      <div>
        <Button className="editBtn Btn" onClick={() => handleEdit(row.id)}>
          Edit
        </Button>
        <Button className="deleteBtn Btn" onClick={() => handleDelete(row.id)}>
          Delete
        </Button>
        <Button
          className="readBtn Btn"
          onClick={() => handleBlockUnblockUser(row.id, row.isStatus)}
        >
          {row.isStatus ? "Block" : "Unblock"}
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

const handleBlockUnblockUser = (id, isStatus) => {
  const action = isStatus ? "Block" : "Unblock";
  console.log(`${action} user with ID:`, id);
};

const handleEdit = (id) => {
  console.log("Edit user with ID:", id);
};
const handleDelete = (id) => {
  console.log("Delete user with ID:", id);
};

const UserList = () => {
  // Fetch user data
  const { data, isLoading, refetch, error } = useGetUsersQuery();
  const [userData, setUserData] = useState([]);
  const dispatch = useDispatch();
  const { isAddNewUserModalOpen } = useSelector((state) => state.modal);

  console.log(data, 'data');
  
  console.log(userData, "userData");

  useEffect(() => {
    if (data?.user) {
      setUserData(data.user);
    } else {
      setUserData([]); 
    }
  }, [data]);

  const handleChange = (e) => {
    let query = e.target.value.toLocaleLowerCase();

    const filterData = data.user.filter((item) => {
      const firstName = item.firstName.toLocaleLowerCase().includes(query);
      const lastName = item.lastName.toLocaleLowerCase().includes(query);
      const email = item.email.toLocaleLowerCase().includes(query);
      const mobile = new RegExp(query).test(item.mobile);

      return firstName || lastName || email || mobile;
    });
    setUserData(filterData);
  };

  const handleAddNewUserModalOpen = () => {
    dispatch(openAddNewUserModal());
  };
  const handleAddNewUserModalClose = () => {
    dispatch(closeAddNewUserModal());
  };

  return (
    <div>
      <div className="homeDiv">
        <div className="addUser">
          <Button className="addUserBtn" onClick={handleAddNewUserModalOpen}>
            Add User
          </Button>
        </div>
        <div className="search">
          <h2>User List</h2>
          <input type="text" placeholder="Search..." onChange={handleChange} />
        </div>
        {isLoading ? (
          <div className="flex justify-center">
            <Loader />
          </div>
        ) : error ? (
          <div>Error loading users</div>
        ) : (
          <DataTable
            columns={columns}
            data={userData}
            customStyles={customStyles}
            pagination
          />
        )}
      </div>
      <Modal
        isOpen={isAddNewUserModalOpen}
        onClose={handleAddNewUserModalClose}
        title={"Add New User"}
      >
        <AddNewUser 
        handleAddNewUserModalClose={handleAddNewUserModalClose}
        refetchUsers={refetch}
        />
      </Modal>
    </div>
  );
};

export default UserList;
