import styles from '../styles/SearchField.module.css';

export default function SearchField() {
  return (
    <div>
      <form action="/images/" method="get">
        <div>
          <input
            type="text"
            id="searchField"
            placeholder="search"
            name="s"
            className={styles.search}
          />
          {/* <button type="submit" className={styles.btnsecondary}>
            go
          </button> */}
        </div>
      </form>
    </div>
  );
}
