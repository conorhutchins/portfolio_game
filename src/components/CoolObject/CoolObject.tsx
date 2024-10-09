import React from 'react';
import styles from './CoolObject.module.css';

// Define the custom interface
interface CSSPropertiesWithVars extends React.CSSProperties {
  [key: `--${string}`]: string | number | undefined;
}

const CoolObject: React.FC = () => {
  const items = [];
  for (let i = 1; i <= 20; i++) {
    items.push(
      <div
        key={i}
        className={styles.item}
        style={{ '--i': i } as CSSPropertiesWithVars}
      ></div>
    );
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>{items}</div>
    </section>
  );
};

export default CoolObject;
