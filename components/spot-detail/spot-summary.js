import classes from './spot-summary.module.css';

function SpotSummary(props) {
  const { title } = props;

  return (
    <section className={classes.summary}>
      <h1>{title}</h1>
    </section>
  );
}

export default SpotSummary;
