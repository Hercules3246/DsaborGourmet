import React, { useState, useEffect } from "react";
import { Input, Button, Form, notification, Icon } from "antd";
import { updateProductApi } from "../../../../api/product";
import { getAccesTokenApi } from "../../../../api/auth";

import { BookOutlined } from "@ant-design/icons";

import "./EditProductForm.scss";

export default function EditProductForm(props) {
  const { setReloadProduct, setIsVisibleModal, prod } = props;
  const [prodData, setProdData] = useState({});
  useEffect(() => {
    setProdData(prod);
  }, [prod]);

  const editProd = (event) => {
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
        message: "Los campos de precio o cantidad deben ser numericos",
      });
    } else {
      const accessToken = getAccesTokenApi();
      updateProductApi(accessToken, prodData._id, prodData)
        .then((res) => {
          notification["success"]({
            message: res,
          });
          setReloadProduct(true);
          setIsVisibleModal(false);
          setProdData({});
        })
        .catch(() => {
          notification["error"]({
            message: "Error en el servidor.",
          });
        });
    }
  };

  return (
    <div className="edit-product-form">
      <EditForm
        prodData={prodData}
        setProdData={setProdData}
        editProd={editProd}
      />
    </div>
  );
}

function EditForm(props) {
  const { prodData, setProdData, editProd } = props;
  return (
    <Form className="form-edit" onSubmit={editProd}>
      <Form.Item>
        <Input
          placeholder="Nombre del producto"
          value={prodData.name}
          onChange={(e) => {
            setProdData({ ...prodData, name: e.target.value });
          }}
        />
      </Form.Item>
      <Form.Item>
        <Input
          placeholder="Descripcion del producto"
          value={prodData.description}
          onChange={(e) =>
            setProdData({ ...prodData, description: e.target.value })
          }
        />
      </Form.Item>
      <Form.Item>
        <Input
          placeholder="Precio del producto"
          value={prodData.price}
          onChange={(e) => setProdData({ ...prodData, price: e.target.value })}
        />
      </Form.Item>
      <Form.Item>
        <Input
          placeholder="Cantidad"
          value={prodData.stock}
          onChange={(e) => setProdData({ ...prodData, stock: e.target.value })}
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="btn-submit">
          Editar Producto
        </Button>
      </Form.Item>
    </Form>
  );
}
