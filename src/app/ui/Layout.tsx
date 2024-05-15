import { Route, Routes } from 'react-router-dom';
import { Layout } from 'antd';

import { Footer } from '../../components/footer/footer';
import { Header } from '../../components/header/header';
import { routes } from '../../router';

import './_layout.scss';

const { Content } = Layout;

export const GlobalLayout = () => (
  <Layout className="layout">
    <Header />
    <Content className="content">
      <Routes>
        {routes.map((route) => (
          <Route path={route.path} element={route.element} key={route.path} />
        ))}
      </Routes>
    </Content>
    <Footer />
  </Layout>
);
