import React, { useState } from 'react';
import Navigation from '../Navigation/Navigation';
import Header from '../Header/Header';
import Content from '../Content/Content';
import { BrowserRouter as Router } from "react-router-dom";
import Footer from '../Footer/Footer';
import Login from '../../../main/shared/Login/Login';

const RouterAsAny = Router as any;

const Root: React.FC = () => {
  const [connected, setConnected] = useState<boolean>(false);

  const handleClick = (num: boolean) => {
    setConnected(num);
  };

  return (
    <div>
      <RouterAsAny>
        {connected ? (
          <div>
            <Navigation connected={connected} />
            <Header connected={connected} handleClick={handleClick} />
            <div id="right-panel" className="right-panel">
              <div className="content">
                <div className="animated fadeIn">
                  <div className="row">
                    <Content connected={connected} />
                  </div>
                </div>
              </div>
              <div className="clearfix"></div>
              <Footer connected={connected} />
            </div>
          </div>
        ) : (
          <Login handleClick={handleClick} />
        )}
      </RouterAsAny>
    </div>
  );
};

export default Root;
