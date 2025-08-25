import React, { useEffect, useState } from 'react';
import './Header.css';
import { Link, useHistory } from 'react-router-dom';
import { LoadJS } from '../../../libraries/datatables/datatables';
import settingsHTTPService from '../../services/settingsHTTPService';

interface HeaderProps {
    connected: boolean;
    handleClick: (connected: boolean) => void;
}

interface HeaderSettings {
    showLogo?: number | string;
    enbaleSearchBar?: number | string;
}

interface SearchActivity {
    input: string;
}

const LinkAsAny = Link as any;

const Header: React.FC<HeaderProps> = ({ connected, handleClick }) => {
    const history = useHistory();
    const [headerSettings, setHeaderSettings] = useState<HeaderSettings>({});
    const initialState: SearchActivity = {
        input: '',
    };
    const [activity, setActivity] = useState<SearchActivity>(initialState);

    useEffect(() => {
        LoadJS();
        getHeaderSettings();
    }, []);

    const getHeaderSettings = () => {
        settingsHTTPService.getHeaderSettings().then((response: { data: HeaderSettings[] }) => {
            if (response.data && response.data.length > 0) {
                setHeaderSettings(response.data[0]);
            }
        });
    };

    const logout = () => {
        handleClick(false);
        localStorage.clear();
        history.push("/login");
    };

    const search = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.keyCode === 13) {
            history.replace("/result/" + activity.input);
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setActivity({ ...activity, [name]: value });
    };

    const print = () => {
        history.replace("/result/" + activity.input);
    };

    return (
        <div id="right-panel" className="right-panel" style={{ display: connected ? 'block' : 'none' }}>
            <header id="header" className="header">
                <div className="top-left">
                    <div className="navbar-header">
                        {headerSettings.showLogo == 1 &&
                            <a className="navbar-brand" href="./"><img src="/images/logo.png" alt="Logo" /></a>
                        }
                        <a className="navbar-brand hidden" href="./"><img src="/images/logo2.png" alt="Logo" /></a>
                        <button id="menuToggle" className="menutoggle"><i className="fa fa-bars"></i></button>
                    </div>
                </div>
                <div className="top-right">
                    <div className="header-menu">
                        <div className="header-left">
                            {headerSettings.enbaleSearchBar == 1 &&
                                <button className="search-trigger"><i className="fa fa-search"></i></button>
                            }
                            <div className="form-inline">
                                <form className="search-form">
                                    <input onChange={handleInputChange} name="input" value={activity.input} onKeyDown={search} className="form-control mr-sm-2" type="text" placeholder="Search ..." aria-label="Search" />
                                    <button onClick={print} className="search-close" type="submit"><i className="fa fa-close"></i></button>
                                </form>
                            </div>
                        </div>

                        <div className="user-area dropdown float-right">
                            <a href="#" className="dropdown-toggle active" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <img className="user-avatar rounded-circle" src="/images/admin.png" alt="User Avatar" />
                            </a>

                            <div className="user-menu dropdown-menu">
                                <LinkAsAny to="/profile" className="nav-link"><i className="fa fa-user"></i>My Profile</LinkAsAny>
                                <LinkAsAny to="/configuration" className="nav-link"><i className="fa fa-cog"></i>Settings</LinkAsAny>
                                <LinkAsAny to="/" onClick={logout} className="nav-link"><i className="fa fa-power-off"></i>Log out</LinkAsAny>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
};

export default Header;
