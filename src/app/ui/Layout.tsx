import { Route, Routes } from 'react-router-dom';
import { Layout } from 'antd';

import { Footer } from '../../components/footer/footer';
import { Header } from '../../components/header/header';
import { routes } from '../../router';

import './_layout.scss';

const { Content } = Layout;

export const MyLayout = () => (
  <Layout className="layout">
    <Header />
    <Content className="content">
      <Routes>
        {routes.map((rout) => (
          <Route path={rout.path} element={rout.element} key={rout.path} />
        ))}
      </Routes>
    </Content>
    <Footer />
  </Layout>
);
