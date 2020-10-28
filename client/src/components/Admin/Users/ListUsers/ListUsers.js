import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import queryString from "query-string";
import {
  Switch,
  List,
  Avatar,
  Button,
  Icon,
  notification,
  Modal as ModalAntd,
} from "antd";
import NoAvatar from "../../../../assets/img/png/no-avatar.png";
import Modal from "../../../Modal";
import EditUserForm from "../EditUserForm";
import AddUserForm from "../AddUserForm";
import {
  getAvatarApi,
  activateUserApi,
  deleteUserApi,
  getUserSearch,
} from "../../../../api/user";
import { getAccesTokenApi } from "../../../../api/auth";
import Pagination from "../../../../components/Pagination";

import "./ListUsers.scss";
const { confirm } = ModalAntd;

function ListUsers(props) {
  const { location, history } = props;
  const { usersActive, usersInactive, setReloadUsers } = props;
  const [viewUsersActives, setViewUsersActive] = useState(true);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);
  const [setSearch, search] = useState("");

  //Pagination
  const { page = 1 } = queryString.parse(location.search);
  const [productLocation, setProductLocation] = useState(null); // pagination - pagina actual
  const [ProductLocationTotal, setProductLocationTotal] = useState(null); //paginacion - cantidad total de documents
  const [ProductLocationLimit, setProductLocationLimit] = useState(null); //limite de productos

  const addUserModal = () => {
    setIsVisibleModal(true);
    setModalTitle("Creando Nuevo Usuario");
    setModalContent(
      <AddUserForm
        setIsVisibleModal={setIsVisibleModal}
        setReloadUsers={setReloadUsers}
      />
    );
  };

  const ActivePagination = () => {
    useEffect(() => {
      getUserSearch(page, "6", search)
        .then((response) => {
          if (response?.code !== 200) {
            notification["warning"]({
              message: response.message,
            });
          } else {
            setProductLocation(response.clients.page);
            setProductLocationTotal(response.clients.total);
            setProductLocationLimit(response.clients.limit);
          }
        })
        .catch((err) => {
          notification["error"]({
            message: "Error del servidor",
          });
        });
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
      getUserSearch(page, "1", search)
        .then((response) => {
          if (response?.code !== 200) {
            notification["warning"]({
              message: response.message,
            });
          } else {
            setProductLocation(response.clients.page);
            setProductLocationTotal(response.clients.total);
            setProductLocationLimit(response.clients.limit);
          }
        })
        .catch((err) => {
          notification["error"]({
            message: "Error del servidor",
          });
        });
    }, [page]);

    return (
      <Pagination
        productLocation={productLocation}
        ProductLocationLimit={ProductLocationLimit}
        ProductLocationTotal={ProductLocationTotal}
        location={location}
        history={history}
        setReloadUsers={setReloadUsers}
      />
    );
  };

  return (
    <div className="list-users">
      <div className="list-users__header">
        <div className="list-users__header-switch">
          <Switch
            defaultChecked
            onChange={() => setViewUsersActive(!viewUsersActives)}
          />
          <span>
            {viewUsersActives ? "Usuarios Activos" : "Usuarios Inactivos "}
          </span>
        </div>
        <Button type="primary" onClick={addUserModal}>
          Nuevo Usuario
        </Button>
      </div>
      {viewUsersActives ? (
        <UsersActive
          usersActive={usersActive}
          setIsVisibleModal={setIsVisibleModal}
          setModalTitle={setModalTitle}
          setModalContent={setModalContent}
          setReloadUsers={setReloadUsers}
        />
      ) : (
        <UsersInactive
          usersInactive={usersInactive}
          setReloadUsers={setReloadUsers}
        />
      )}

      <Modal
        title={modalTitle}
        isVisible={isVisibleModal}
        setIsVisible={setIsVisibleModal}
      >
        {modalContent}
      </Modal>
      {viewUsersActives ? <ActivePagination /> : <InactivePagination />}
    </div>
  );
}

function UsersActive(props) {
  const {
    usersActive,
    setIsVisibleModal,
    setModalTitle,
    setModalContent,
    setReloadUsers,
  } = props;

  const editUser = (user) => {
    setIsVisibleModal(true);
    setModalTitle(
      `Editar ${user.name ? user.name : "..."} ${
        user.lastname ? user.lastname : "..."
      }`
    );
    setModalContent(
      <EditUserForm
        user={user}
        setIsVisibleModal={setIsVisibleModal}
        setReloadUsers={setReloadUsers}
      />
    );
  };
  return (
    <List
      className="users-active"
      itemLayout="horizontal"
      dataSource={usersActive}
      renderItem={(user) => (
        <UserActive
          user={user}
          editUser={editUser}
          setReloadUsers={setReloadUsers}
        />
      )}
    />
  );
}

function UserActive(props) {
  const { user, editUser, setReloadUsers } = props;
  const [avatar, setAvatar] = useState(null);
  useEffect(() => {
    if (user.avatar) {
      getAvatarApi(user.avatar).then((response) => {
        setAvatar(response);
      });
    } else {
      setAvatar(null);
    }
  }, [user]);

  const desactivateUser = () => {
    const accesToken = getAccesTokenApi();

    activateUserApi(accesToken, user._id, false)
      .then((response) => {
        notification["success"]({
          message: response,
        });
        setReloadUsers(true);
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
      title: "Eliminando usuario",
      content: `¿Estas seguro que quieres eliminar a ${user.email}?`,
      okText: "Eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk() {
        deleteUserApi(accesToken, user._id)
          .then((response) => {
            notification["success"]({
              message: response,
            });
            setReloadUsers(true);
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
        <Button type="primary" onClick={() => editUser(user)}>
          <Icon type="edit" />
        </Button>,
        <Button type="danger" onClick={desactivateUser}>
          <Icon type="stop" />
        </Button>,
        <Button type="danger" onClick={showDeleteConfirm}>
          <Icon type="delete" />
        </Button>,
      ]}
    >
      <List.Item.Meta
        avatar={<Avatar src={avatar ? avatar : NoAvatar} />}
        title={`
      ${user.name ? user.name : "....."}
      ${user.lastname ? user.lastname : "....."}
      `}
        description={user.email}
      />
    </List.Item>
  );
}

function UsersInactive(props) {
  const { usersInactive, setReloadUsers } = props;
  return (
    <List
      className="users-active"
      itemLayout="horizontal"
      dataSource={usersInactive}
      renderItem={(user) => (
        <UserInactive user={user} setReloadUsers={setReloadUsers} />
      )}
    />
  );
}

function UserInactive(props) {
  const { user, setReloadUsers } = props;
  const [avatar, setAvatar] = useState(null);
  useEffect(() => {
    if (user.avatar) {
      getAvatarApi(user.avatar).then((response) => {
        setAvatar(response);
      });
    } else {
      setAvatar(null);
    }
  }, [user]);

  const activateUser = () => {
    const accesToken = getAccesTokenApi();

    activateUserApi(accesToken, user._id, true)
      .then((response) => {
        notification["success"]({
          message: response,
        });
        setReloadUsers(true);
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
      title: "Eliminando usuario",
      content: `¿Estas seguro que quieres eliminar a ${user.email}?`,
      okText: "Eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk() {
        deleteUserApi(accesToken, user._id)
          .then((response) => {
            notification["success"]({
              message: response,
            });
            setReloadUsers(true);
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
        <Button type="primary" onClick={activateUser}>
          <Icon type="check" />
        </Button>,
        <Button type="danger" onClick={showDeleteConfirm}>
          <Icon type="delete" />
        </Button>,
      ]}
    >
      <List.Item.Meta
        avatar={<Avatar src={avatar ? avatar : NoAvatar} />}
        title={`
                ${user.name ? user.name : "..."} 
                ${user.lastname ? user.lastname : "..."}
            `}
        description={user.email}
      />
    </List.Item>
  );
}

export default withRouter(ListUsers);
