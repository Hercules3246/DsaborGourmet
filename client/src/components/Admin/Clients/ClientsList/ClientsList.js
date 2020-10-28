import React, { useState, useEffect } from "react";
import {
  Table,
  Input,
  Button,
  Icon,
  Switch,
  Modal as ModalAntd,
  notification,
  List,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import ExportExcel from "react-export-excel";
import "./ClientsList.scss";

import { getAccesTokenApi } from "../../../../api/auth";

import { getClientSearch, deleteClientApi } from "../../../../api/client";
import AddClientForm from "../AddClientForm";
import EditClientForm from "../EditClientForm";

import Modal from "../../../Modal";
import { withRouter } from "react-router-dom";

const { Column } = Table;
const { confirm } = ModalAntd;
const { Search } = Input;
const ExcelFile = ExportExcel.ExcelFile;
const ExcelSheet = ExportExcel.ExcelSheet;
const ExcelColumn = ExportExcel.ExcelColumn;

function ClientsList(props) {
  const [data, setData] = useState([]);
  const [listColum, setListColums] = useState([]);
  const [search, setSearch] = useState("");
  const [searchColumn, setSearchColumn] = useState("");
  const [reloadProduct, setReloadProduct] = useState(false); //Recargar producto

  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  const addProductModal = () => {
    setIsVisibleModal(true);
    setModalTitle("Creando Nuevo Cliente");
    setModalContent(
      <AddClientForm
        setIsVisibleModal={setIsVisibleModal}
        setReloadProduct={setReloadProduct}
      />
    );
  };

  console.log(props);

  useEffect(() => {
    //este metodo se ejecuta, justo despues de que el componente ah sido montado
    getClientSearch(search).then((response) => {
      setData(response.clients); //lo que viene de la base de datos, se lo pasamos a nuestro estado
    });
    setReloadProduct(false);
  }, [reloadProduct, search]);

  const ProductSearchActives = (param) => {
    setSearch(param);
  };

  return (
    <div className="product-list">
      <div className="product-list__header">
        <div className="product-list__header-switch">
          <div className="__search-content">
            <Search
              className="__search-button"
              placeholder="Busca un cliente"
              enterButton="Buscar"
              size="large"
              onSearch={(value) => ProductSearchActives(value)}
            />
          </div>
        </div>

        <div className="__buttons">
          <ExcelFile
            element={
              <Button type="primary" onClick={console.log("Excel")}>
                Exportar a excel
              </Button>
            }
            filename="clientes"
          >
            <ExcelSheet data={data} name="Clientes">
              <ExcelColumn label="Identificacion CLiente" value="idClient" />
              <ExcelColumn label="Nombre CLiente" value="name" />
              <ExcelColumn label="Nombre del negocio" value="businessName" />
              <ExcelColumn label="Telefono del negocio" value="phoneNumber" />
              <ExcelColumn label="Ruta" value="route" />
              <ExcelColumn label="Barrio" value="neighborhood" />
            </ExcelSheet>
          </ExcelFile>
          &nbsp;
          <Button type="primary" onClick={addProductModal}>
            Nuevo cliente
          </Button>
        </div>
      </div>
      <ClientActive
        className="clients"
        data={data}
        setReloadProduct={setReloadProduct}
        setIsVisibleModal={setIsVisibleModal}
        setModalTitle={setModalTitle}
        setModalContent={setModalContent}
      />
      ;
      <Modal
        title={modalTitle}
        isVisible={isVisibleModal}
        setIsVisible={setIsVisibleModal}
      >
        {modalContent}
      </Modal>
    </div>
  );
}

function ClientActive(props) {
  const {
    data,
    setReloadProduct,
    setIsVisibleModal,
    setModalTitle,
    setModalContent,
  } = props;

  const editProd = (prod) => {
    setIsVisibleModal(true);
    setModalTitle(`Editar a ${prod.name} / ${prod.businessName} `);
    setModalContent(
      <EditClientForm
        prod={prod}
        setIsVisibleModal={setIsVisibleModal}
        setReloadProduct={setReloadProduct}
      />
    );
  };

  const showDeleteConfirm = (data) => {
    const accesToken = getAccesTokenApi();
    confirm({
      title: "Eliminando cliente",
      content: `¿Estas seguro que quieres eliminar ${data.name}?`,
      okText: "Eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk() {
        deleteClientApi(accesToken, data._id)
          .then((response) => {
            notification["success"]({
              message: response,
            });
            setReloadProduct(true);
          })
          .catch((err) => {
            notification["error"]({
              message: err,
            });
          });
      },
    });
  };

  return (
    <Table
      dataSource={data}
      className="products-active"
      rowKey={(record) => record._id}
      size="small"
    >
      <Column title="Id Cliente" dataIndex="idClient" key="idClient" />
      <Column title="Nombre" dataIndex="name" key="name" />
      <Column
        title="Negocio Nombre"
        dataIndex="businessName"
        key="businessName"
        filterIcon={SearchOutlined}
        filterDropdownVisible="true"
      />
      <Column
        title="Numero de Telefono"
        dataIndex="phoneNumber"
        key="phoneNumber"
      />
      <Column title="Ruta" dataIndex="route" key="route" />
      <Column title="Barrio" dataIndex="neighborhood" key="neighborhood" />
      <Column
        title="Editar"
        key="action"
        render={(data) => (
          <div className="__buttons">
            <Button type="primary" onClickCapture={() => editProd(data)}>
              <Icon type="edit" />
            </Button>
            ,
            <Button
              type="danger"
              onClickCapture={() => showDeleteConfirm(data)}
            >
              <Icon type="delete" />
            </Button>
          </div>
        )}
      />
    </Table>
  );
}

export default withRouter(ClientsList);
