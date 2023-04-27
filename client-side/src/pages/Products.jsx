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
} from "@chakra-ui/react";

function Products() {
  const [products, setProductList] = useState([]);
  const fetchProductsData = async () => {
    let response = await Axios.get("http://localhost:8001/product/product");
    setProductList(response.data);
  };

  const renderList = () => {
    return products.map((product) => {
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
              src={product.product_img}
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
      <p className="text-4xl font-bold">product List</p>
      {renderList()}
    </div>
  );
}

export default Products;
