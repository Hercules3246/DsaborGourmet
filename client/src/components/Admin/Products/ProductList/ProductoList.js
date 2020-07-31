import React, { useState, useEffect } from "react";
import {
  List,
  Button,
  Icon,
  notification,
  Modal as ModalAntd,
  Switch,
} from "antd";
import Modal from "../../../Modal";
import DragSortableList from "react-drag-sortable";
import { getAccesTokenApi } from "../../../../api/auth";

import AddProductForm from "../AddProductForm";
import EditProductForm from "../EditProductForm";
import { updateProductApi, deleteProductApi } from "../../../../api/product";

import "./ProductList.scss";

export default function ProductList(props) {
  const { product, setReloadProduct } = props;
  const [listItems, setListItems] = useState([]);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);
  const [viewProductActives, setViewProductActives] = useState(true);

  const { confirm } = ModalAntd;

  useEffect(() => {
    const listItemsArray = [];
    product.forEach((item) => {
      listItemsArray.push({
        content: (
          <ProductItem
            item={item}
            showDeleteConfirm={showDeleteConfirm}
            editProductForm={editProductForm}
          />
        ),
      });
    });
    setListItems(listItemsArray);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  const onSort = (sortedList, dropEvent) => {
    const accessToken = getAccesTokenApi();
    sortedList.forEach((item) => {
      const { _id } = item.content.props.item;
      const order = item.rank;
      updateProductApi(accessToken, _id, { order });
    });
  };

  const addProduct = () => {
    setIsVisibleModal(true);
    setModalTitle("Creando nuevo producto ");
    setModalContent(
      <AddProductForm
        setIsVisibleModal={setIsVisibleModal}
        setReloadProduct={setReloadProduct}
        showDeleteConfirm={showDeleteConfirm}
      />
    );
  };

  // const activateProduct = () => {
  //   const accesToken = getAccesTokenApi();

  //   activateUserApi(accesToken, user._id, true)
  //     .then((response) => {
  //       notification["success"]({
  //         message: response,
  //       });
  //       setReloadUsers(true);
  //     })
  //     .catch((err) => {
  //       notification["error"]({
  //         message: err,
  //       });
  //     });
  // };

  const showDeleteConfirm = (product) => {
    const accessToken = getAccesTokenApi();
    confirm({
      title: "Eliminando producto",
      content: `¿Estas seguro que deseas eliminar  ${product.name}`,
      okText: "Eliminar",
      okType: "danger",
      cancelText: "cancelar",
      onOk() {
        deleteProductApi(accessToken, product._id)
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

  const editProductForm = (product) => {
    setIsVisibleModal(true);
    setModalTitle("Editando producto");
    setModalContent(
      <EditProductForm
        setIsVisibleModal={setIsVisibleModal}
        setReloadProduct={setReloadProduct}
        product={product}
      />
    );
  };

  return (
    <div className="product-list">
      <div className="product-list__header">
        <div className="list-users__header-switch">
          <Switch
            defaultChecked
            onChange={() => setViewProductActives(!viewProductActives)}
          />
          <span>
            {viewProductActives ? "Productos Activos" : "Productos Inactivos "}
          </span>
        </div>

        <Button type="primary" onClick={addProduct}>
          Nuevo Producto
        </Button>
      </div>

      <div className="product-list__items">
        <DragSortableList items={listItems} onSort={onSort} type="vertical" />
      </div>

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

function ProductItem(props) {
  const { item, showDeleteConfirm, editProductForm } = props;
  return (
    <List.Item
      actions={[
        <Button type="danger" /*onClick={desactivateUser}*/>
          <Icon type="stop" />
        </Button>,
        <Button type="primary" onClick={() => editProductForm(item)}>
          <Icon type="edit" />
        </Button>,
        <Button type="danger" onClick={() => showDeleteConfirm(item)}>
          <Icon type="delete" />
        </Button>,
      ]}
    >
      <List.Item.Meta title={item.name} description={item.description} />
    </List.Item>
  );
}
