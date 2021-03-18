import React, { useState, useEffect } from 'react';
import { Layout, Menu, Avatar, Dropdown } from 'antd';
import {
  LogoutOutlined,
  CaretDownOutlined,
  UserOutlined,
  SettingOutlined,
  CalendarOutlined,
  UsergroupAddOutlined,
  BorderlessTableOutlined,
  PlayCircleOutlined
} from '@ant-design/icons';

import { useHistory, NavLink, useLocation } from 'react-router-dom';
import { Divider } from '../../Divider';

import AvatarDefault from '../../../assets/avatar.svg';

import { getUser, removeUser } from '../../../common/storage';

import './styles.scss';

const { Header: AntHeader } = Layout;

export const Header = () => {
  const loggedUser = getUser();
  const admin = loggedUser ? loggedUser.admin : false;

  const [logout, setLogout] = useState(false);
  const history = useHistory();

  const location = useLocation();
  const currentPath = location.pathname.split('/')[1];

  useEffect(() => {
    // if (data && data?.logout) {
    if (logout) {
      history.push('/login');
      removeUser();
    }
  });

  const handleLogoutAction = () => {
    // eslint-disable-next-line no-console
    setLogout(true);
    history.push('/login');
    removeUser();
  };

  const setActive = (path) => (currentPath === path ? `ant-menu-item-selected` : '');

  const menu = (
    <Menu>
      <Menu.Item>
        <UserOutlined /> Perfil
      </Menu.Item>
      <Menu.Item icon={<SettingOutlined />}>
        <NavLink to="/configurations">Configuraciones</NavLink>
      </Menu.Item>
      <Divider />
      <Menu.Item onClick={handleLogoutAction}>
        <LogoutOutlined /> Cerrar sesión
      </Menu.Item>
    </Menu>
  );

  if (admin) {
    return (
      <AntHeader className="ifa-BaseLayout__header">
        <Menu mode="horizontal" className="ant-main__menu">
          <Menu.Item key="1" className={setActive('main') || setActive('')} active icon={<CalendarOutlined />}>
            <NavLink to="/main">Principal</NavLink>
          </Menu.Item>
          <Menu.Item key="2" className={setActive('users')} icon={<UsergroupAddOutlined disabled={!admin} />}>
            <NavLink to="/users">Usuarios</NavLink>
          </Menu.Item>
          <Menu.Item key="3" className={setActive('lists')} icon={<BorderlessTableOutlined disabled={!admin} />}>
            <NavLink to="/lists">Listas</NavLink>
          </Menu.Item>
          <Menu.Item key="4" className={setActive('videos')} icon={<PlayCircleOutlined disabled={!admin} />}>
            <NavLink to="/videos">Videos</NavLink>
          </Menu.Item>
        </Menu>
        <Dropdown overlay={menu} placement="bottomRight" trigger={['click']}>
          <span className="ifa-BaseLayout__header-account">
            <Avatar size={30} icon={<img src={AvatarDefault} alt="User" />} />
            <span className="username">
              {loggedUser?.fullName} <CaretDownOutlined />
            </span>
          </span>
        </Dropdown>
      </AntHeader>
    );
  } else
    return (
      <AntHeader className="ifa-BaseLayout__header">
        <Menu mode="horizontal" className="ant-main__menu">
          <Menu.Item key="1" className={setActive('main') || setActive('')} active icon={<CalendarOutlined />}>
            <NavLink to="/main">Principal</NavLink>
          </Menu.Item>
        </Menu>
        <Dropdown overlay={menu} placement="bottomRight" trigger={['click']}>
          <span className="ifa-BaseLayout__header-account">
            <Avatar size={30} icon={<img src={AvatarDefault} alt="User" />} />
            <span className="username">
              {loggedUser?.fullName} <CaretDownOutlined />
            </span>
          </span>
        </Dropdown>
      </AntHeader>
    );
};
