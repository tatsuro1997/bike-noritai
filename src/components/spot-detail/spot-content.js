import classes from './spot-content.module.css';

const SpotContent = ({ children }) => <section className={classes.content}>{children}</section>;

export default SpotContent;
