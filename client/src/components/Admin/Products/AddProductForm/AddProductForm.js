import React, { useState, useEffect } from "react";
import { Form, Icon, Input, Button, Select, notification } from "antd";
import { BookOutlined } from "@ant-design/icons";
import { addProductApi } from "../../../../api/product";
import { getAccesTokenApi } from "../../../../api/auth";

import "./AddProductForm.scss";

export default function AddProductForm(props) {
  const { setIsVisibleModal, setReloadProduct } = props;
  const [prodData, setprodData] = useState({});

  const addProduct = (event) => {
    event.preventDefault();
    if (
      !prodData.name ||
      !prodData.description ||
      !prodData.price ||
      !prodData.stock
    ) {
      notification["error"]({
        message: "Todos los campos son obligatorios",
      });
    } else if (isNaN(prodData.price) || isNaN(prodData.stock)) {
      notification["error"]({
        message: "Los campos de precio o cantidad deben ser, NUMERICOS",
      });
    } else {
      const accessToken = getAccesTokenApi();
      addProductApi(accessToken, prodData)
        .then((res) => {
          notification["success"]({
            message: res,
          });
          setIsVisibleModal(false);
          setReloadProduct(true);
          setprodData({});
        })
        .catch(() => {
          notification["error"]({
            message: "Error en el servidor.",
          });
        });
    }
  };
  return (
    <div className="add-product-form">
      <AddForm
        prodData={prodData}
        setprodData={setprodData}
        addProduct={addProduct}
      />
    </div>
  );
}

function AddForm(props) {
  const { prodData, setprodData, addProduct } = props;

  return (
    <Form className="form-add" onSubmit={addProduct}>
      <Form.Item>
        <Input
          prefix={<BookOutlined />}
          placeholder="Nombre del producto"
          value={prodData.name}
          onChange={(e) => setprodData({ ...prodData, name: e.target.value })}
        />
      </Form.Item>
      <Form.Item>
        <Input
          placeholder="Descripcion del producto"
          value={prodData.description}
          onChange={(e) =>
            setprodData({ ...prodData, description: e.target.value })
          }
        />
      </Form.Item>
      <Form.Item>
        <Input
          placeholder="Precio del producto"
          value={prodData.price}
          onChange={(e) => setprodData({ ...prodData, price: e.target.value })}
        />
      </Form.Item>
      <Form.Item>
        <Input
          placeholder="Cantidad"
          value={prodData.stock}
          onChange={(e) => setprodData({ ...prodData, stock: e.target.value })}
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="btn-submit">
          Crear Producto
        </Button>
      </Form.Item>
    </Form>
  );
}
