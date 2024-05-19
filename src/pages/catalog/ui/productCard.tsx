import { Product } from '@commercetools/platform-sdk';
import { Card } from 'antd';

const { Meta } = Card;

export const ProductCard = ({ product }: { product: Product }) => {
  const name = product?.masterData?.current?.name?.['en-GB'];
  const description = product?.masterData?.current?.description?.['en-GB'];
  const imgUrl = product?.masterData?.current?.masterVariant?.images?.[0]?.url;

  return (
    <Card
      hoverable
      style={{
        width: 240,
      }}
      cover={<img alt="example" src={imgUrl} />}
    >
      <Meta title={name} description={description} />
    </Card>
  );
};
