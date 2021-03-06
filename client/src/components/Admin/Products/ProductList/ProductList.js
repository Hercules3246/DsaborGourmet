import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import queryString from "query-string";
import {
  List,
  Button,
  Icon,
  notification,
  Modal as ModalAntd,
  Switch,
  Input,
} from "antd";

import Modal from "../../../Modal";
import { getAccesTokenApi } from "../../../../api/auth";
import Pagination from "../../../../components/Pagination";

import EditProductForm from "../EditProductForm";
import AddProductForm from "../AddProductForm";
import {
  activateProdApi,
  deleteProductApi,
  getProductSearch,
} from "../../../../api/product";

import "./ProductList.scss";
const { confirm } = ModalAntd;
const { Search } = Input;

function ProductList(props) {
  const { location, history } = props;
  const [viewProductActives, setViewProductActives] = useState(true); //Switcher
  const [productActiveSearch, setProductActiveSearch] = useState(""); //search
  const [productActive, setProductActive] = useState([]); //productos activos
  const [productInactive, setProductInactive] = useState([]); //productos inactivos
  const [reloadProduct, setReloadProduct] = useState(false); //Recargar producto

  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  //Pagination
  const { page = 1 } = queryString.parse(location.search);
  const [productLocation, setProductLocation] = useState(null); // pagination - pagina actual
  const [ProductLocationTotal, setProductLocationTotal] = useState(null); //paginacion - cantidad total de documents
  const [ProductLocationLimit, setProductLocationLimit] = useState(null); //limite de productos

  const addProductModal = () => {
    setIsVisibleModal(true);
    setModalTitle("Creando Nuevo Producto");
    setModalContent(
      <AddProductForm
        setIsVisibleModal={setIsVisibleModal}
        setReloadProduct={setReloadProduct}
      />
    );
  };

  const ActivePagination = () => {
    useEffect(() => {
      getProductSearch(page, 6, productActiveSearch, true)
        .then((response) => {
          if (response?.code !== 200) {
            notification["warning"]({
              message: response.message,
            });
          } else {
            setProductLocation(response.posts.page);
            setProductLocationTotal(response.posts.total);
            setProductLocationLimit(response.posts.limit);
          }
        })
        .catch((err) => {
          notification["error"]({
            message: "Error del servidor",
          });
        });
      setReloadProduct(false);
    }, [page]);

    return (
      <Pagination
        productLocation={productLocation}
        ProductLocationLimit={ProductLocationLimit}
        ProductLocationTotal={ProductLocationTotal}
        location={location}
        history={history}
        setProductLocation={setProductLocation}
      />
    );
  };

  const InactivePagination = () => {
    useEffect(() => {
      getProductSearch(page, 6, productActiveSearch, false)
        .then((response) => {
          if (response?.code !== 200) {
            notification["warning"]({
              message: response.message,
            });
          } else {
            setProductLocation(response.posts.page);
            setProductLocationTotal(response.posts.total);
            setProductLocationLimit(response.posts.limit);
          }
        })
        .catch((err) => {
          notification["error"]({
            message: "Error del servidor",
          });
        });
      setReloadProduct(false);
    }, [page]);

    return (
      <Pagination
        productLocation={productLocation}
        ProductLocationLimit={ProductLocationLimit}
        ProductLocationTotal={ProductLocationTotal}
        location={location}
        history={history}
        setReloadProduct={setReloadProduct}
      />
    );
  };

  useEffect(() => {
    history.push(`${location.pathname}`);
  }, [viewProductActives, productActiveSearch]);

  useEffect(() => {
    //este metodo se ejecuta, justo despues de que el componente ah sido montado
    getProductSearch(page, 6, productActiveSearch, true).then((response) => {
      setProductActive(response.posts.docs); //lo que viene de la base de datos, se lo pasamos a nuestro estado
    });
    getProductSearch(page, 6, productActiveSearch, false).then((response) => {
      setProductInactive(response.posts.docs); //lo que viene de la base de datos, se lo pasamos a nuestro estado
    });
    setReloadProduct(false);
  }, [reloadProduct, page]);

  const restarPage = () => {
    const currentPage = parseInt(productLocation);
    const resta = currentPage - 1;
    this.page = resta;
  };

  useEffect(() => {
    if (
      ProductLocationTotal == 6 ||
      ProductLocationTotal == 12 ||
      ProductLocationTotal == 18 ||
      ProductLocationTotal == 24 ||
      ProductLocationTotal == 30 ||
      ProductLocationTotal == 36 ||
      ProductLocationTotal == 42 ||
      ProductLocationTotal == 48 ||
      ProductLocationTotal == 54 ||
      ProductLocationTotal == 60 ||
      ProductLocationTotal == 66 ||
      ProductLocationTotal == 72 ||
      ProductLocationTotal == 78 ||
      ProductLocationTotal == 84 ||
      ProductLocationTotal == 90 ||
      ProductLocationTotal == 96 ||
      ProductLocationTotal == 102 ||
      ProductLocationTotal == 108 ||
      ProductLocationTotal == 114 ||
      ProductLocationTotal == 120 ||
      ProductLocationTotal == 126 ||
      ProductLocationTotal == 132 ||
      ProductLocationTotal == 138 ||
      ProductLocationTotal == 144 ||
      ProductLocationTotal == 150 ||
      ProductLocationTotal == 156 ||
      ProductLocationTotal == 162 ||
      ProductLocationTotal == 168 ||
      ProductLocationTotal == 174 ||
      ProductLocationTotal == 180 ||
      ProductLocationTotal == 186 ||
      ProductLocationTotal == 192 ||
      ProductLocationTotal == 198 ||
      ProductLocationTotal == 204 ||
      ProductLocationTotal == 210 ||
      ProductLocationTotal == 216 ||
      ProductLocationTotal == 240 ||
      ProductLocationTotal == 246 ||
      ProductLocationTotal == 252 ||
      ProductLocationTotal == 258 ||
      ProductLocationTotal == 264 ||
      ProductLocationTotal == 270 ||
      ProductLocationTotal == 276
    ) {
      history.push(`${location.pathname}?page=${restarPage}`);
    }
  }, [ProductLocationTotal]);

  const ProductSearchActives = () => {
    getProductSearch(page, 6, productActiveSearch, true)
      .then((response) => {
        if (response?.code !== 200) {
          notification["warning"]({
            message: response.message,
          });
        } else {
          setProductActive(response.posts.docs);
        }
      })
      .catch((err) => {
        notification["error"]({
          message: "Error del servidor",
        });
      });
    setReloadProduct(true);
    history.push(`${location.pathname}`);
  };

  const ProductSearchInactives = () => {
    getProductSearch(page, 6, productActiveSearch, false)
      .then((response) => {
        if (response?.code !== 200) {
          notification["warning"]({
            message: response.message,
          });
        } else {
          setProductInactive(response.posts.docs);
        }
      })
      .catch((err) => {
        notification["error"]({
          message: "Error del servidor",
        });
      });
    setReloadProduct(true);
    history.push(`${location.pathname}`);
  };

  const productSearchingActive = (param) => {
    setProductActiveSearch(param);
    if (viewProductActives) {
      ProductSearchActives();
    } else {
      ProductSearchInactives();
    }
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

          <div className="__search-content">
            <Search
              className="__search-button"
              placeholder="Busca un producto"
              enterButton="Buscar"
              size="large"
              onSearch={(value) => productSearchingActive(value)}
            />
          </div>
        </div>

        <div className="__button_content">
          <Button type="primary" onClick={addProductModal}>
            Nuevo Producto
          </Button>
        </div>
      </div>

      {viewProductActives ? (
        <ProductsActive
          productActive={productActive}
          setReloadProduct={setReloadProduct}
          setIsVisibleModal={setIsVisibleModal}
          setModalTitle={setModalTitle}
          setModalContent={setModalContent}
        />
      ) : (
        <ProductsInactive
          productInactive={productInactive}
          setReloadProduct={setReloadProduct}
        />
      )}

      <Modal
        title={modalTitle}
        isVisible={isVisibleModal}
        setIsVisible={setIsVisibleModal}
      >
        {modalContent}
      </Modal>

      {viewProductActives ? <ActivePagination /> : <InactivePagination />}
    </div>
  );
}

function ProductsActive(props) {
  const {
    productActive,
    setReloadProduct,
    setIsVisibleModal,
    setModalTitle,
    setModalContent,
  } = props;

  const editProd = (prod) => {
    setIsVisibleModal(true);
    setModalTitle(`Editar ${prod.name} / ${prod.description} `);
    setModalContent(
      <EditProductForm
        prod={prod}
        setIsVisibleModal={setIsVisibleModal}
        setReloadProduct={setReloadProduct}
      />
    );
  };

  return (
    <List
      className="products-active"
      itemLayout="horizontal"
      dataSource={productActive}
      renderItem={(prod) => (
        <ProductsActiveList
          prod={prod}
          setReloadProduct={setReloadProduct}
          editProd={editProd}
        />
      )}
    />
  );
}

function ProductsActiveList(props) {
  const { prod, setReloadProduct, editProd } = props;

  const desactivateProd = () => {
    const accesToken = getAccesTokenApi();

    activateProdApi(accesToken, prod._id, false)
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
  };

  const showDeleteConfirm = () => {
    const accesToken = getAccesTokenApi();

    confirm({
      title: "Eliminando producto",
      content: `¿Estas seguro que quieres eliminar ${prod.name}?`,
      okText: "Eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk() {
        deleteProductApi(accesToken, prod._id)
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
    <List.Item
      actions={[
        <Button type="danger" onClick={desactivateProd}>
          <Icon type="stop" />
        </Button>,
        <Button type="primary" onClick={() => editProd(prod)}>
          <Icon type="edit" />
        </Button>,
        <Button type="danger" onClick={showDeleteConfirm}>
          <Icon type="delete" />
        </Button>,
      ]}
    >
      <List.Item.Meta
        title={`${prod.name} - ${prod.description}  `}
        description={` precio: ${prod.price}`}
      ></List.Item.Meta>
    </List.Item>
  );
}

function ProductsInactive(props) {
  const { productInactive, setReloadProduct } = props;
  return (
    <List
      className="products-active"
      itemLayout="horizontal"
      dataSource={productInactive}
      renderItem={(prod) => (
        <ProductsInactiveList prod={prod} setReloadProduct={setReloadProduct} />
      )}
    />
  );
}

function ProductsInactiveList(props) {
  const { prod, setReloadProduct } = props;

  const activateProd = () => {
    const accesToken = getAccesTokenApi();

    activateProdApi(accesToken, prod._id, true)
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
  };

  const showDeleteConfirm = () => {
    const accesToken = getAccesTokenApi();

    confirm({
      title: "Eliminando producto",
      content: `¿Estas seguro que quieres eliminar  ${prod.name}?`,
      okText: "Eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk() {
        deleteProductApi(accesToken, prod._id)
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
    <List.Item
      actions={[
        <Button type="primary" onClick={activateProd}>
          <Icon type="check" />
        </Button>,
        <Button type="danger" onClick={showDeleteConfirm}>
          <Icon type="delete" />
        </Button>,
      ]}
    >
      <List.Item.Meta
        title={`${prod.name} - ${prod.description}  `}
        description={` precio: ${prod.price}`}
      ></List.Item.Meta>
    </List.Item>
  );
}

export default withRouter(ProductList);
