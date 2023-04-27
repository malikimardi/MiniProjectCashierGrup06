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

  const [search, setSearch] = useState(``);
  const [sort, setSort] = useState(`newest`);

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

  useEffect(() => {
    if (sort === "newest") {
      setProductList((prev) =>
        [...prev].sort((a, b) => a.id_product - b.id_product)
      );
    } else if (sort === "lowPrice") {
      setProductList((prev) =>
        [...prev].sort((a, b) => a.product_price - b.product_price)
      );
    } else if (sort === "highPrice") {
      setProductList((prev) =>
        [...prev].sort((a, b) => b.product_price - a.product_price)
      );
    } else if (sort === "desc") {
      setProductList((prev) =>
        [...prev].sort((a, b) => a.product_name - b.product_name)
      );
    } else {
      setProductList((prev) => [...prev].sort());
    }
  }, [sort]);

  return (
    <div className="w-3/4 mx-auto my-10">
      <p className="text-4xl font-bold">Product List</p>
      <Input
        placeholder="Search..."
        onChange={(name) => setSearch(name.target.value)}
      />
      <Select placeholder="Sorted By" onChange={(e) => setSort(e.target.value)}>
        <option value="newest">Newest</option>
        <option value="lowPrice">Lowest Price</option>
        <option value="highPrice">Highest Price</option>
        <option value="asc">A-Z</option>
        <option value="desc">Z-A</option>
      </Select>

      <div>{renderList()}</div>
    </div>
  );
}

export default Products;
