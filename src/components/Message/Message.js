import React from 'react';
import styles from './Message.module.css';

const Message = ({ text }) => {
  return (
    <div className={styles.messageWrapper}>
      <p>{text}</p>
    </div>
  );
};

export default Message;
