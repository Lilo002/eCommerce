import { getPlayers, getRoundedNumber } from '../model/data';

interface Details {
  name: string;
  value: number;
}

const Detail = ({ title, value }: { title: string; value: number | string }) => (
  <p>
    <span className="product-info-detail">{title}:</span> {value}
  </p>
);

export const ProductDetails = ({ attributes }: { attributes: Details[] }) => {
  const [, year, difficulty, rating, minPlayers, maxPlayers] = attributes;

  return (
    <div className="product-info">
      <Detail title="Year" value={year.value} />
      <Detail title="Difficulty" value={getRoundedNumber(difficulty.value)} />
      <Detail title="Rating" value={getRoundedNumber(rating.value)} />
      <Detail title="Players" value={getPlayers(minPlayers.value, maxPlayers.value)} />
    </div>
  );
};
