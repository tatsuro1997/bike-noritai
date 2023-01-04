import classes from "./spot-summary.module.css";

const SpotSummary = ({ name }) => (
  <section className={classes.summary}>
    <h1>{name}</h1>
  </section>
);

export default SpotSummary;
