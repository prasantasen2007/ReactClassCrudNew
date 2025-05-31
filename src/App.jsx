import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
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
import { AddEditModal } from "./components/AddEditModal";

function App() {
  const [products, setProducts] = useState([
    { id: 1, name: "Rice", price: 25.99 },
    { id: 2, name: "Soap", price: 14.49 },
    { id: 3, name: "Tea", price: 39.99 },
  ]);
  const [showModal, setShowModal] = useState(false);
  const handleAddProduct = () => {
    setShowModal(true);
  };
  return (
    <>
      <Button
        variant="contained"
        size="small"
        onClick={handleAddProduct}
        style={{ marginBottom: 20 }}
      >
        Add New Product
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.price.toFixed(2)}</TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<EditIcon />}
                    ></Button>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<DeleteIcon />}
                    ></Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <AddEditModal open={showModal} handleClose={()=>setShowModal(false)}/>
    </>
  );
}

export default App;
