import React, { useState, useEffect } from "react";
import { Input, Button, Form, notification, Select } from "antd";
import { updateRouteApi } from "../../../../api/route";
import { getAccesTokenApi } from "../../../../api/auth";

import "./EditRouteForm.scss";

export default function EditProductForm(props) {
  const { setReloadProduct, setIsVisibleModal, prod } = props;
  const [prodData, setProdData] = useState({});
  useEffect(() => {
    setProdData(prod);
  }, [prod]);

  const editProd = (event) => {
    event.preventDefault();
    if (!prodData.name || !prodData.description || !prodData.dia) {
      notification["error"]({
        message: "Todos los campos son obligatorios",
      });
    } else {
      const accessToken = getAccesTokenApi();
      updateRouteApi(accessToken, prodData._id, prodData)
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
  const { Option } = Select;
  return (
    <Form className="form-edit" onSubmit={editProd}>
      <Form.Item>
        <Input
          placeholder="Nombre de la ruta"
          value={prodData.name}
          onChange={(e) => {
            setProdData({ ...prodData, name: e.target.value });
          }}
        />
      </Form.Item>
      <Form.Item>
        <Input
          placeholder="Descripcion de la ruta"
          value={prodData.description}
          onChange={(e) =>
            setProdData({ ...prodData, description: e.target.value })
          }
        />
      </Form.Item>
      <Form.Item>
        <Select
          placeholder="Selecciona un dia"
          onChange={(e) => setProdData({ ...prodData, dia: e })}
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
          Editar ruta
        </Button>
      </Form.Item>
    </Form>
  );
}
