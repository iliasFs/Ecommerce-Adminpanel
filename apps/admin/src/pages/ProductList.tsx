import { useState, useEffect } from "react";
import { Card, Row, Col } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import { RiDeleteBin5Line } from "react-icons/ri";
import { BiEdit } from "react-icons/bi";

interface Product {
  id: number;
  name: string;
  images: string;
  price: number;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    reloadPage();
  }, []);

  const reloadPage = () => {
    axios
      .get("http://localhost:8080/product")
      .then((response) => setProducts(response.data));
  };

  const handleDelete = async (id: number) => {
    await axios.delete(`http://localhost:8080/product/${id}`);
    reloadPage();
  };
  return (
    <Row gutter={[16, 16]}>
      {products.map((product) => (
        <Col xs={24} sm={12} md={8} lg={6} xl={4} key={product.id}>
          <Link to={`/admin/product-list/${product.id}`}></Link>
          <Card
            hoverable
            cover={
              <>
                <img
                  alt={product.name}
                  src={product.images[0]}
                  style={{
                    maxHeight: "200px",
                    maxWidth: "450px",
                    objectFit: "cover",
                    position: "relative",
                  }}
                />
                <button
                  onClick={() => handleDelete(product.id)}
                  className="absolute max-w-[50px] top-0 right-0 color-white rounded-xl px-2 py-1 font-bold  text-red-600 transition duration-300 ease-in-out hover:bg-red-700 hover:text-white hover:scale-105 z-50"
                >
                  <RiDeleteBin5Line size={30} />
                </button>
              </>
            }
          >
            <Link
              className="absolute max-w-[50px] top-0 left-0 color-white rounded-xl px-2 py-1 font-bold  text-red-600 transition duration-300 ease-in-out hover:bg-red-700 hover:text-white hover:scale-105 z-50"
              to={`/admin/product-list/${product.id}`}
            >
              <BiEdit size={30} />
            </Link>

            <Card.Meta
              title={product.name}
              description={`Price: $${product.price}`}
            />
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default ProductList;
