import React, { useState, useEffect } from "react";
import { Input, Button, Form, notification, Select } from "antd";
import { updateClientApi } from "../../../../api/client";
import { getAccesTokenApi } from "../../../../api/auth";

import "./EditClientForm.scss";
export default function EditClientForm(props) {
  const { setReloadProduct, setIsVisibleModal, prod } = props;
  const [prodData, setProdData] = useState({});
  useEffect(() => {
    setProdData(prod);
  }, [prod]);

  const editProd = (event) => {
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
      updateClientApi(accessToken, prodData._id, prodData)
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
    <div className="edit-client-form">
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
          placeholder="Identificacion del Cliente"
          value={prodData.idClient}
          onChange={(e) => {
            setProdData({ ...prodData, idClient: e.target.value });
          }}
        />
      </Form.Item>
      <Form.Item>
        <Input
          placeholder="Nombre de cliente"
          value={prodData.name}
          onChange={(e) => setProdData({ ...prodData, name: e.target.value })}
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
            setProdData({ ...prodData, businessName: e.target.value })
          }
        />
      </Form.Item>
      <Form.Item>
        <Input
          placeholder="Telefono del cliente"
          value={prodData.phoneNumber}
          onChange={(e) =>
            setProdData({ ...prodData, phoneNumber: e.target.value })
          }
        />
      </Form.Item>
      <Form.Item>
        <Input
          placeholder="Ruta"
          value={prodData.route}
          onChange={(e) => setProdData({ ...prodData, route: e.target.value })}
        />
      </Form.Item>
      <Form.Item>
        <Input
          placeholder="Barrio"
          value={prodData.neighborhood}
          onChange={(e) =>
            setProdData({ ...prodData, neighborhood: e.target.value })
          }
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="btn-submit">
          Editar cliente
        </Button>
      </Form.Item>
    </Form>
  );
}
