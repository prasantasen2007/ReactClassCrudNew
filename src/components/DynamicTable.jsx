import { useEffect, useState } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Stack,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { AddEditModalNew } from "./AddEditModalNew";
import { toast } from "react-toastify";

export const DynamicTable = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  /** This functions to get list of users **/
  const getUsers = () => {
    axios
      .get("https://dummyjson.com/users")
      .then((response) => {
        console.log(response, "Response");
        setUsers(response.data.users || []);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleEditUser = (user) => {
    setShowModal(true);
    setSelectedUser(user);
  };
  const handleDeleteUser = (id) => {
    axios
      .delete(`https://dummyjson.com/users/${id}`)
      .then((response) => {
        console.log(response);

        if (response.status == 200) {
          setUsers((prev) => {
            return prev.filter((eachElement) => eachElement.id !== id);
          });
          toast.success(response.message || "Deleted Successfully");
        }
      })
      .catch((error) => {
        toast.error("Failed to Delete User !");
        console.log(error);
      });
  };

  const handleSaveUser = (user) => {
    console.log(user);

    if (user.id) {
      axios
        .put(
          `https://dummyjson.com/users/${user.id}`,
          {
            ...user,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log(response);
          console.log(user);

          if (response.status == 200) {
            setUsers((prevUser) =>
              prevUser.map((eachUser) =>
                eachUser.id == user.id ? { ...user } : eachUser
              )
            );
            toast.success("User updated successfully");
          }
        })
        .catch((error) => {
          console.log(error);
          toast.error("Unabail to update user");
        });
    } else {
      axios
        .post(
          "https://dummyjson.com/users/add",
          {
            ...user,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log(response);
          console.log(user);

          if (response.status == 201) {
            // setUsers((prev) => {
            //   return [...prev, { ...user, id: prev.length + 1 }];
            // });

            setUsers((prev) => [...prev, { ...user, id: prev.length + 1 }]);
          }
          toast.success("User Added Successfully");
        })
        .catch((error) => {
          console.log(error);
          toast.error("Unable to update user");
        });
    }

    console.log(user, "user is");
  };

  console.log(users);

  const handleAddUser = () => {
    setShowModal(true);
    setSelectedUser(null);
  };

  return (
    <>
      <Button
        variant="contained"
        size="small"
        onClick={handleAddUser}
        style={{ marginBottom: 20 }}
      >
        Add New User
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>DOB</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>
                  {user.firstName} {user.lastName}
                </TableCell>
                <TableCell>{user.birthDate}</TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<EditIcon />}
                      onClick={() => handleEditUser(user)}
                    ></Button>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<DeleteIcon />}
                      onClick={() => handleDeleteUser(user.id)}
                    ></Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <AddEditModalNew
        onSave={handleSaveUser}
        open={showModal}
        handleClose={() => {
          setShowModal(false);
          setSelectedUser(null);
        }}
        submittedUser={selectedUser}
      />
    </>
  );
};
