import React, { useEffect, useState } from 'react';
import './Footer.css';
import settingsHTTPService from '../../services/settingsHTTPService';

interface FooterProps {
  connected: boolean;
}

interface FooterSettings {
  enableFooter?: number | string;
}

const Footer: React.FC<FooterProps> = ({ connected }) => {
  const [footerSettings, setFooterSettings] = useState<FooterSettings>({});

  useEffect(() => {
    getFooterSettings();
  }, []);

  const getFooterSettings = () => {
    settingsHTTPService.getFooterSettings().then((response: { data: FooterSettings[] }) => {
      if (response.data && response.data.length > 0) {
        setFooterSettings(response.data[0]);
      }
    });
  };

  return (
    <footer style={{ display: connected ? 'block' : 'none' }} className="site-footer">
      <div className="footer-inner bg-white">
        {footerSettings.enableFooter == 1 && (
          <div className="row">
            <div className="col-sm-6">
              Developed by <a href="https://worldcloud9.com/">World Cloud 9</a>
            </div>
            <div className="col-sm-6 text-right"></div>
          </div>
        )}
      </div>
    </footer>
  );
};

export default Footer;
