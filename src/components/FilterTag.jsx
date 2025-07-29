import React from "react";
import styles from "../styles/FilterBar.module.css";

function FilterTag({ label, onRemove }) {
  return (
    <span className={styles.filterTag}>
      {label} <button onClick={onRemove}>×</button>
    </span>
  );
}

export default FilterTag;
