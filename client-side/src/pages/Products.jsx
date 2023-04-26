import React, { useEffect, useState } from "react";
import Axios from "axios";
import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Stack,
  Heading,
  Text,
  Button,
  Select,
  Input,
} from "@chakra-ui/react";

function Products() {
  const [products, setProductList] = useState([]);
  const fetchProductsData = async () => {
    let response = await Axios.get(`http://localhost:8001/product/product/`);
    setProductList(response.data);
  };
  const [sorted, setSorted] = useState({
    sorted: "product_name",
  });

  const sortedByName = () => {
    setSorted({ sorted: "product_name", reversed: !sorted.reversed });
    const productsCopy = [...products];
    productsCopy.sort((productA, productB) => {
      const nameProductA = `${productA.product_name}`;
      const nameProductB = `${productB.product_name}`;

      return nameProductB.localeCompare(nameProductA);
    });
    setProductList(productsCopy);
  };

  const sortedByPrice = () => {
    setSorted({ sorted: "product_price", reversed: !sorted.reversed });
    const productsCopy = [...products];
    productsCopy.sort((productA, productB) => {
      return productB.product_price - productA.product_price;
    });
    setProductList(productsCopy);
  };

  const [search, setSearch] = useState(``);

  const renderList = () => {
    return products
      .filter((product) => {
        return search.toLowerCase() === ""
          ? product
          : product.product_name.toLowerCase().includes(search);
      })
      .map((product) => {
        return (
          <div className="my-10">
            <Card
              direction={{ base: "column", sm: "row" }}
              overflow="hidden"
              variant="outline"
            >
              <Image
                objectFit="cover"
                maxW={{ base: "100%", sm: "200px" }}
                src={`http://localhost:8001/${product.product_img}`}
                alt=""
              />

              <Stack>
                <CardBody>
                  <Heading size="md">{product.product_name}</Heading>

                  <Text py="2">
                    {product.product_price.toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })}
                  </Text>
                  <Text>{product.product_desc}</Text>
                </CardBody>

                <CardFooter className="gap-7">
                  <Button variant="solid" colorScheme="blue">
                    Buy
                  </Button>
                </CardFooter>
              </Stack>
            </Card>
          </div>
        );
      });
  };

  useEffect(() => {
    fetchProductsData();
  }, []);

  return (
    <div className="w-3/4 mx-auto my-10">
      <p className="text-4xl font-bold">Product List</p>
      <Input
        placeholder="Search..."
        onChange={(name) => setSearch(name.target.value)}
      />

      <Select placeholder="Sort By...">
        <option onClick={sortedByName}>Sorted By Name</option>
        <option onClick={sortedByPrice}>Sorted By Price</option>
      </Select>

      <div>{renderList()}</div>
    </div>
  );
}

export default Products;
