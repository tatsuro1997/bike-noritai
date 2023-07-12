import SpotItem from "./spot-item";
import classes from "./spot-list.module.css";

import { components } from '@/schema';

type Spot = components['schemas']['Spot'];

type SpotListProps = {
  items: Spot[];
};

const SpotList = ({ items }: SpotListProps) => (
  <ul className={classes.list}>
    {items.map((spot) => (
      <SpotItem
        // 原本ではkey={spot.id}だったが、型上は id は存在しないので、name に変更
        // 本来あるのであれば openapi の定義を変更するべき
        key={spot?.name}
        spot={spot}
      />
    ))}
  </ul>
);

export default SpotList;
