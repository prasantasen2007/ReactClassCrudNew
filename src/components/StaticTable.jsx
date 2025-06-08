import { useState } from "react";
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
import { AddEditModal } from "./AddEditModal";

function StaticTable() {
  const [products, setProducts] = useState([
    { id: 1, name: "Rice", price: 25.99 },
    { id: 2, name: "Soap", price: 14.49 },
    { id: 3, name: "Tea", price: 39.99 },
  ]);
  const [selectProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const handleAddProduct = () => {
    setShowModal(true);
  };
  const handleSaveProduct = (productData) => {
    if (productData.id) {
      setProducts((prev) =>
        prev.map((eachElement) =>
          eachElement.id == productData.id ? productData : eachElement
        )
      );
    } else {
      const newProduct = {
        ...productData,
        id: products.length
          ? Math.max(...products.map((eachElement) => eachElement.id)) + 1
          : 1,
      };
      setProducts((prev) => [...prev, newProduct]);
    }
  };
  const handleEditProduct = (product) => {
    setShowModal(true);
    setSelectedProduct(product);
  };
  const handleDeleteProduct = (id) => {
    setProducts((prev) => {
      return prev.filter((eachElement) => eachElement.id !== id);
    });
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
                      onClick={() => handleEditProduct(product)}
                    ></Button>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<DeleteIcon />}
                      onClick={() => handleDeleteProduct(product.id)}
                    ></Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <AddEditModal
        onSave={handleSaveProduct}
        open={showModal}
        handleClose={() => {
          setShowModal(false);
          setSelectedProduct(null);
        }}
        submittedProduct={selectProduct}
      />
    </>
  );
}

export default StaticTable;
