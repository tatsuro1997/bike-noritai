import classes from './spot-summary.module.css';

function SpotSummary(props) {
  const { name } = props;

  return (
    <section className={classes.summary}>
      <h1>{name}</h1>
    </section>
  );
}

export default SpotSummary;
