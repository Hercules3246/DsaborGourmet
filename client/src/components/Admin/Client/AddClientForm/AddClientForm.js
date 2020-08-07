import React, { useState, useEffect } from "react";
import { Form, Input, Button, notification, Select } from "antd";
import { addClientAdminApi } from "../../../../api/client";
import { getAccesTokenApi } from "../../../../api/auth";

import "./AddClientForm.scss";
export default function AddClientForm(props) {
  const { setIsVisibleModal, setReloadProduct } = props;
  const [prodData, setprodData] = useState({});

  const addProduct = (event) => {
    event.preventDefault();
    if (
      !prodData.name ||
      !prodData.businessName ||
      !prodData.phoneNumber ||
      !prodData.route ||
      !prodData.neighborhood
    ) {
      notification["error"]({
        message: "Todos los campos son obligatorios",
      });
    } else {
      const accessToken = getAccesTokenApi();
      addClientAdminApi(accessToken, prodData)
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
    <div className="add-client-form">
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
          placeholder="Identificacion del Cliente"
          value={prodData.idClient}
          onChange={(e) => {
            setprodData({ ...prodData, idClient: e.target.value });
          }}
        />
      </Form.Item>
      <Form.Item>
        <Input
          placeholder="Nombre de cliente"
          value={prodData.name}
          onChange={(e) => setprodData({ ...prodData, name: e.target.value })}
        />
      </Form.Item>
      {/* <Form.Item>
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
      </Form.Item> */}
      <Form.Item>
        <Input
          placeholder="Nombre del negocio"
          value={prodData.businessName}
          onChange={(e) =>
            setprodData({ ...prodData, businessName: e.target.value })
          }
        />
      </Form.Item>
      <Form.Item>
        <Input
          placeholder="Telefono del cliente"
          value={prodData.phoneNumber}
          onChange={(e) =>
            setprodData({ ...prodData, phoneNumber: e.target.value })
          }
        />
      </Form.Item>
      <Form.Item>
        <Input
          placeholder="Ruta"
          value={prodData.route}
          onChange={(e) => setprodData({ ...prodData, route: e.target.value })}
        />
      </Form.Item>
      <Form.Item>
        <Input
          placeholder="Barrio"
          value={prodData.neighborhood}
          onChange={(e) =>
            setprodData({ ...prodData, neighborhood: e.target.value })
          }
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="btn-submit">
          Agregar cliente
        </Button>
      </Form.Item>
    </Form>
  );
}
