import React, { useEffect } from 'react';
import { Layout } from 'antd';
import { Redirect, Switch, useHistory } from 'react-router-dom';

import { Main, Users, Lists, Videos } from '../../screens';
import { PrivateRoute } from '../../common/privateRoute';

import { getUser } from '../../common/storage';
import { Header } from './Header';

import './styles.scss';

const { Content } = Layout;

export const BaseLayout = () => {
  const history = useHistory();
  const currentUser = getUser();
  const admin = currentUser ? currentUser.admin : false;

  useEffect(() => {
    if (!currentUser) {
      history.push('/login');
    }
  });

  return (
    <Layout className="ifa-BaseLayout">
      <Layout className="site-layout">
        <Header />
        <Content className="ifa-BaseLayout__content">
          <section>
            <Switch>
              <PrivateRoute exact path="/">
                <Main />
              </PrivateRoute>
              <PrivateRoute exact path="/main">
                <Main />
              </PrivateRoute>
              {admin ? (
                <PrivateRoute exact path="/users">
                  <Users />
                </PrivateRoute>
              ) : (
                <Redirect to="/main" />
              )}
              {admin ? (
                <PrivateRoute exact path="/lists">
                  <Lists />
                </PrivateRoute>
              ) : (
                <Redirect to="/main" />
              )}
              {admin ? (
                <PrivateRoute exact path="/videos">
                  <Videos />
                </PrivateRoute>
              ) : (
                <Redirect to="/main" />
              )}
            </Switch>
          </section>
        </Content>
      </Layout>
    </Layout>
  );
};
