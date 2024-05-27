import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ProductCatalogData, ProductData } from '@commercetools/platform-sdk';
import { Breadcrumb } from 'antd';

import { sessionContext } from '../../context/sessionContext';
import { ROUTES } from '../../shared/constants';

import { ProductDetails } from './ui/productDetails';
import { ProductPrice } from './ui/productPrice';
import { ProductImage } from './ui/slider/slider';

import './ui/_product.scss';

export const ProductPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { session } = useContext(sessionContext);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<ProductData | null>(null);

  useEffect(() => {
    session
      ?.getProduct(productId || '')
      .then((res: ProductCatalogData) => {
        setData(res.current);
        setIsLoading(false);
      })
      .catch(() => navigate(ROUTES.NOT_FOUND));
  }, [navigate, productId, session]);

  if (!data) {
    return <div>Product not found</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const { name, masterVariant, description } = data;
  const images = data.masterVariant?.images;
  const price = masterVariant?.prices?.[0];
  const isDiscounted = !!data.masterVariant?.prices?.[0]?.discounted;
  const attributes = masterVariant?.attributes || [];

  return (
    <article className="product-inner">
      {images && <ProductImage images={images} />}
      <div className="product">
        <Breadcrumb
          className="product-breadcrumb"
          separator=">"
          items={[
            {
              title: 'Home',
              href: ROUTES.MAIN,
            },
            {
              title: 'Catalog',
              href: ROUTES.CATALOG,
            },
            {
              title: name['en-GB'],
            },
          ]}
        />
        <h2 className="product-title">{name['en-GB']}</h2>
        <ProductPrice price={price} isDiscounted={isDiscounted} />
        <div className="product-info">
          <div className="product-info-title">
            <h3 className="product-info-title-content">Description</h3>
          </div>
          <p>{description?.['en-GB']}</p>
          <div className="product-info-title">
            <h3 className="product-info-title-content">Details</h3>
          </div>
          <ProductDetails attributes={attributes} />
        </div>
      </div>
    </article>
  );
};
