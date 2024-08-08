import React from 'react';
import qrCode from '../../assets/qr.svg';
import styles from './QRCode.module.css';

const QRCode: React.FC = () => {
  return (
    <div className={styles.qrCodeContainer}>
      <img src={qrCode} alt="QR Code with contact info" className={styles.qrCode} />
    </div>
  );
};

export default QRCode;
