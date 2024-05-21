import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ProductCatalogData } from '@commercetools/platform-sdk';

import { sessionContext } from '../../context/sessionContext';
import { ROUTES } from '../../shared/constants';

import { getPlayers, getPrice } from './model/data';

import './ui/_product.scss';

export const ProductPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { session } = useContext(sessionContext);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<ProductCatalogData | null>(null);

  useEffect(() => {
    session
      ?.getProductFromServer(productId || '')
      .then((res: ProductCatalogData) => {
        setData(res);
        setIsLoading(false);
        console.log(res.current.masterVariant.prices?.[0].discounted);
      })
      .catch(() => navigate(ROUTES.NOT_FOUND));
  }, [navigate, productId, session]);
  return (
    !isLoading &&
    data && (
      <div className="product">
        <h2 className="product-title">{data.current.name['en-GB']}</h2>
        <p className="product-price">{getPrice(data.current.masterVariant.prices?.[0].value)}</p>
        <div className="product-info">
          <div className="product-info-title">
            <h3 className="product-info-title-content">Description</h3>
          </div>
          <p>{data.current.description?.['en-GB']}</p>
          <div className="product-info-title">
            <h3 className="product-info-title-content">Details</h3>
          </div>
          <p>
            <span className="product-info-detail">Year:</span>
            {data.current.masterVariant.attributes?.[0].value}
          </p>
          <p>
            <span className="product-info-detail">Difficulty:</span>
            {data.current.masterVariant.attributes?.[1].value}
          </p>
          <p>
            <span className="product-info-detail">Rating:</span>
            {data.current.masterVariant.attributes?.[2].value}
          </p>
          <p>
            <span className="product-info-detail">Players:</span>
            {getPlayers(
              data.current.masterVariant.attributes?.[3].value,
              data.current.masterVariant.attributes?.[4].value,
            )}
          </p>
        </div>
      </div>
    )
  );
};
