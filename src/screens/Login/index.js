import React, { useState, useEffect } from 'react';

import { Form, Input, Button, Checkbox, Layout, Row, Alert } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import { useHistory } from 'react-router-dom';

import * as storage from '../../common/storage';

import { loginUser } from '../../api/userServices';

import { getMessage } from '../../utils/language';

import './styles.scss';

const { Content } = Layout;

export const Login = () => {
  const [login, loginUserData] = useState({ data: null, error: false, loading: false });
  const history = useHistory();

  useEffect(() => {
    if (login.data) {
      storage.setUser(login.data);
    }
    if (storage.getUser()) {
      history.push('/');
    }
  }, [history, login.data]);

  const onFinish = async (values) => {
    const { username, password } = values;

    loginUserData({ data: null, error: false, loading: true });

    const responseData = await loginUser(username, password);

    const { statusCode, response, message } = responseData.data;

    console.log(message);

    if (statusCode === 400) loginUserData({ data: null, error: message, loading: false });
    else {
      const user = {
        id: response.id,
        firstName: username,
        lastName: 'IFA',
        username: username,
        password: response.password,
        email: response.email,
        fullName: `${username}`,
        admin: response.admin,
        token: response.token,
        refreshToken: response.refreshToken,
        confirmed: false
      };

      loginUserData({ data: user, error: false, loading: false });
    }
  };

  const renderErrorMessage = () => {
    if (login.error) {
      return <Alert message={login.error} type="error" showIcon style={{ marginBottom: '0.5em' }} />;
    }
  };

  return (
    <Layout className="loginPage">
      <Content>
        <Row align="middle" className="loginPage__mainContainer">
          <Form name="normal_login" className="loginForm" initialValues={{ remember: true }} onFinish={onFinish}>
            <Row style={{ display: 'flex', flexDirection: 'column' }}>
              <h3 className="loginForm__title">Bienvenido!</h3>
              {renderErrorMessage()}
            </Row>
            <Form.Item name="username" rules={[{ required: true, message: getMessage('USER_ERROR_USERNAME_MESSAGE', null) }]}>
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Usuario" />
            </Form.Item>

            <Form.Item name="password" rules={[{ required: true, message: getMessage('USER_ERROR_PASSWORD_EMPTY', null) }]}>
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Contraseña"
              />
            </Form.Item>

            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Recordar</Checkbox>
              </Form.Item>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" loading={login.loading} className="login-form-button">
                Login
              </Button>
            </Form.Item>
          </Form>
        </Row>
      </Content>
    </Layout>
  );
};
