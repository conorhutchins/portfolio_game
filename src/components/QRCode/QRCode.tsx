import React from 'react';
import { useTheme } from '../../theme/ThemeContext';
import qrCodeLight from '../../assets/light-qr.svg';
import qrCodeDark from '../../assets/dark-qr.svg';
import styles from './QRCode.module.css';

const QRCode: React.FC = () => {
  const { isDarkMode } = useTheme();

  const qrCode = isDarkMode ? qrCodeDark : qrCodeLight;

  return (
    <div className={styles.qrCodeContainer}>
      <img src={qrCode} alt="QR Code with contact info" className={styles.qrCode} />
    </div>
  );
};

export default QRCode;
