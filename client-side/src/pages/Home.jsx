import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Axios from "axios";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";

function Home() {
  const [products, setProductList] = useState([]);
  const fetchProductsData = async () => {
    let response = await Axios.get("http://localhost:8001/product/product");
    setProductList(response.data);
  };

  const renderList = () => {
    return products.map((product) => {
      return (
        <Tr>
          <Td>{product.product_name}</Td>
          <Td>{product.product_price}</Td>
          <Td>{product.product_desc}</Td>
        </Tr>
      );
    });
  };
  useEffect(() => {
    fetchProductsData();
  }, []);

  return (
    <div className="border-2 border-solid mx-32 my-9 p-6 rounded-md">
      <TableContainer>
        <Table variant="striped" colorScheme="blue">
          <Thead>
            <Tr>
              <Th>Nama Product</Th>
              <Th>Price</Th>
              <Th>Description</Th>
            </Tr>
          </Thead>
          <Tbody>{renderList()}</Tbody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Home;
