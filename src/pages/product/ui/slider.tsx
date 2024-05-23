export const ProductImage = ({ imageUrl }: { imageUrl: string }) => (
  <div className="product-slider">
    <img className="product-slider-img" alt="board game" src={imageUrl} />
  </div>
);
