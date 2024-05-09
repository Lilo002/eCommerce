import { Route, Routes } from 'react-router-dom';
import { Layout } from 'antd';

import { Footer } from '../../components/footer/footer';
import { Header } from '../../components/header/header';
import { routes } from '../../router';

import './_layout.scss';

const { Content } = Layout;

export const MyLayout = () => (
  <div>
    <Layout className="layout">
      <Header />
      <Content className="content">
        <Routes>
          {routes.map((rout) => (
            <Route path={rout.path} element={rout.element} />
          ))}
        </Routes>
      </Content>
      <Footer />
    </Layout>
  </div>
);