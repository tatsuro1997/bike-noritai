import classes from './spot-content.module.css';

function SpotContent(props) {
  return (
    <section className={classes.content}>
      {props.children}
    </section>
  );
}

export default SpotContent;
