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

export const DynamicTable = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
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
    setUsers((prev) => {
      return prev.filter((eachElement) => eachElement.id !== id);
    });
  };

 const handleSaveUser = (id) => {

  };

  return (
    <>
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
