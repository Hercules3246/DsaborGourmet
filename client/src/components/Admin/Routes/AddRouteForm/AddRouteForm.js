import React, { useState, useEffect } from "react";
import { Form, Input, Button, notification, Select } from "antd";
import { addRouteAdminApi } from "../../../../api/route";
import { getAccesTokenApi } from "../../../../api/auth";

import "./AddRouteForm.scss";

export default function AddProductForm(props) {
  const { setIsVisibleModal, setReloadProduct } = props;
  const [prodData, setprodData] = useState({});

  const addProduct = (event) => {
    event.preventDefault();
    if (!prodData.name || !prodData.dia || !prodData.description) {
      notification["error"]({
        message: "Todos los campos son obligatorios",
      });
    } else {
      const accessToken = getAccesTokenApi();
      addRouteAdminApi(accessToken, prodData)
        .then((res) => {
          notification["success"]({
            message: res,
          });
          setReloadProduct(true);
          setIsVisibleModal(false);
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
  const { Option } = Select;

  return (
    <Form className="form-add" onSubmit={addProduct}>
      <Form.Item>
        <Input
          placeholder="Nombre de la ruta"
          value={prodData.name}
          onChange={(e) => setprodData({ ...prodData, name: e.target.value })}
        />
      </Form.Item>
      <Form.Item>
        <Input
          placeholder="Descripcion de la ruta"
          value={prodData.description}
          onChange={(e) =>
            setprodData({ ...prodData, description: e.target.value })
          }
        />
      </Form.Item>
      <Form.Item>
        <Select
          placeholder="Selecciona un dia"
          onChange={(e) => setprodData({ ...prodData, dia: e })}
          value={prodData.dia}
        >
          <Option value="lunes">Lunes</Option>
          <Option value="martes">Martes</Option>
          <Option value="miercoles">Miercoles</Option>
          <Option value="jueves">Jueves</Option>
          <Option value="viernes">Viernes</Option>
          <Option value="sabado">Sabado</Option>
          <Option value="domingo">Domingo</Option>
        </Select>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="btn-submit">
          Crear ruta
        </Button>
      </Form.Item>
    </Form>
  );
}
