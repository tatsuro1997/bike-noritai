import Button from '../ui/button';
import classes from './results-title.module.css';

function ResultsTitle(props) {
  const { searchKeyword } = props;

  return (
    <section className={classes.title}>
      <h1>{searchKeyword} スポット一覧</h1>
      <Button link="/spots">Show all spots</Button>
    </section>
  );
}

export default ResultsTitle;
