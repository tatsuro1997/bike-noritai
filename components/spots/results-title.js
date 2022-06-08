import SpotsSearch from './spots-search';

import classes from './results-title.module.css';

function ResultsTitle(props) {
  const { searchKeyword } = props;

  return (
    <section className={classes.title}>
      <h1>{searchKeyword} スポット一覧</h1>
      <SpotsSearch />
    </section>
  );
}

export default ResultsTitle;
