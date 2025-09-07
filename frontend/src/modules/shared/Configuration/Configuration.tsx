import React, { useEffect, useState, useCallback } from 'react';
import './Configuration.css';
import settingsHTTPService from '../../../main/services/settingsHTTPService';
import EditSystemSettings from '../EditSystemSettings/EditSystemSettings';
import EditLocalisationSettings from '../EditLocalisationSettings/EditLocalisationSettings';
import EditHeaderSettings from '../EditHeaderSettings/EditHeaderSettings';
import EditNotificationsSettings from '../EditNotificationsSettings/EditNotificationsSettings';
import EditDashboardSettings from '../EditDashboardSettings/EditDashboardSettings';
import EditEmailSettings from '../EditEmailSettings/EditEmailSettings';
import EditFooterSettings from '../EditFooterSettings/EditFooterSettings';

// Define interfaces for each settings object
interface SystemSettings {
  id: number;
  appName: string;
  showLogo: string;
  address: string;
  email: string;
}
interface DashboardSettings {
  id: number;
  showSummary: string;
  showCalendar: string;
  showExpenseIncomeCharts: string;
}
interface HeaderSettings {
  id: number;
  enbaleSearchBar: string;
  showLogo: string;
}
interface FooterSettings {
  id: number;
  enableFooter: string;
}
interface LocalisationSettings {
  id: number;
  language: string;
  dateFormat: string;
  currency: string;
  currencySymbol: string;
}
interface EmailSettings {
  id: number;
  emailSentAddress: string;
  smtp: string;
}
interface NotificationSettings {
  id: number;
  showNotification: string;
}

const Configuration: React.FC = () => {
  const [systemSettings, setSystemSettings] = useState<SystemSettings | {}>({});
  const [dashboardSettings, setDashboardSettings] = useState<DashboardSettings | {}>({});
  const [headerSettings, setHeaderSettings] = useState<HeaderSettings | {}>({});
  const [footerSettings, setFooterSettings] = useState<FooterSettings | {}>({});
  const [localisationSettings, setLocalisationSettings] = useState<LocalisationSettings | {}>({});
  const [emailSettings, setEmailSettings] = useState<EmailSettings | {}>({});
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings | {}>({});

  const getSystemSettings = useCallback(() => {
    settingsHTTPService.getSystemSettings().then(response => {
      setSystemSettings(response.data[0] || {});
    });
  }, []);

  const getEmailSettings = useCallback(() => {
    settingsHTTPService.getEmailSettings().then(response => {
      setEmailSettings(response.data[0] || {});
    });
  }, []);

  const getEmailTemplateSettings = useCallback(() => {
    // This was a bug, calling getSystemSettings instead. Assuming it should fetch email templates.
    // settingsHTTPService.getEmailTemplateSettings().then(response => {
    //   setemailTemplateSettings(response.data[0] || {});
    // });
  }, []);

  const getLocalisationSettings = useCallback(() => {
    settingsHTTPService.getLocalisationSettings().then(response => {
      setLocalisationSettings(response.data[0] || {});
    });
  }, []);

  const getFooterSettings = useCallback(() => {
    settingsHTTPService.getFooterSettings().then(response => {
      setFooterSettings(response.data[0] || {});
    });
  }, []);

  const getHeaderSettings = useCallback(() => {
    settingsHTTPService.getHeaderSettings().then(response => {
      setHeaderSettings(response.data[0] || {});
    });
  }, []);

  const getDashboardSettings = useCallback(() => {
    settingsHTTPService.getDashboardSettings().then(response => {
      setDashboardSettings(response.data[0] || {});
    });
  }, []);

  const getNotificationSettings = useCallback(() => {
    settingsHTTPService.getNotificationSettings().then(response => {
      setNotificationSettings(response.data[0] || {});
    });
  }, []);

  const refreshComponent = useCallback(() => {
    getSystemSettings();
    getEmailSettings();
    getEmailTemplateSettings();
    getLocalisationSettings();
    getFooterSettings();
    getHeaderSettings();
    getDashboardSettings();
    getNotificationSettings();
  }, [getSystemSettings, getEmailSettings, getEmailTemplateSettings, getLocalisationSettings, getFooterSettings, getHeaderSettings, getDashboardSettings, getNotificationSettings]);

  useEffect(() => {
    refreshComponent();
  }, [refreshComponent]);

  const convertToYesNoValue = (value: string | number) => {
    return value === "1" || value === 1 ? 'Yes' : 'No';
  };

  const restoreSystemSettings = () => {
    if ('id' in systemSettings) {
      settingsHTTPService.restoreSystemSettings(systemSettings.id).then(() => {
        getSystemSettings();
      });
    }
  };

  const restoreDashboardSettings = () => {
    if ('id' in dashboardSettings) {
      settingsHTTPService.restoreDashboardettings(dashboardSettings.id).then(() => {
        getDashboardSettings();
      });
    }
  };

  const restoreHeaderSettings = () => {
    if ('id' in headerSettings) {
      settingsHTTPService.restoreHeaderettings(headerSettings.id).then(() => {
        getHeaderSettings();
      });
    }
  };

  const restoreFooterSettings = () => {
    if ('id' in footerSettings) {
      settingsHTTPService.restoreFooterSettings(footerSettings.id).then(() => {
        getFooterSettings();
      });
    }
  };

  return (
    <div className="container">
      <div className="row gutters-sm">
        <div className="col-md-4 d-none d-md-block">
          <div className="card">
            <div className="card-body">
              <nav className="nav flex-column nav-pills nav-gap-y-1">
                <a href="#system" data-toggle="tab" className="nav-item nav-link has-icon nav-link-faded active">System</a>
                <a href="#localisation" data-toggle="tab" className="nav-item nav-link has-icon nav-link-faded">Localisation</a>
                <a href="#footer" data-toggle="tab" className="nav-item nav-link has-icon nav-link-faded">Footer</a>
                <a href="#notifications" data-toggle="tab" className="nav-item nav-link has-icon nav-link-faded">Notifications</a>
                <a href="#headerbar" data-toggle="tab" className="nav-item nav-link has-icon nav-link-faded">Header</a>
                <a href="#dashboard" data-toggle="tab" className="nav-item nav-link has-icon nav-link-faded">Dashboard</a>
                <a href="#about" data-toggle="tab" className="nav-item nav-link has-icon nav-link-faded">Version</a>
              </nav>
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <div className="card">
            <div className="card-body tab-content">
              <div className="tab-pane active" id="system">
                <h6>System Settings</h6><hr />
                <form>
                  <div className="form-group">
                    <label className="d-block mb-0">App Title</label>
                    <div className="small text-muted mb-3">{'appName' in systemSettings && systemSettings.appName}</div>
                    <label className="d-block mb-0">Show logo</label>
                    <div className="small text-muted mb-3">{'showLogo' in systemSettings && convertToYesNoValue(systemSettings.showLogo)}</div>
                    <label className="d-block mb-0">Entreprise Name</label>
                    <div className="small text-muted mb-3">{'appName' in systemSettings && systemSettings.appName}</div>
                    <label className="d-block mb-0">Address</label>
                    <div className="small text-muted mb-3">{'address' in systemSettings && systemSettings.address}</div>
                    <label className="d-block mb-0">Email</label>
                    <div className="small text-muted mb-3">{'email' in systemSettings && systemSettings.email}</div>
                    <button className="btn btn-info" type="button" data-toggle="modal" data-target="#editSystemSettings">Edit</button>
                    <button onClick={restoreSystemSettings} className="btn btn-warning" type="button">Restore to default</button>
                  </div>
                </form>
                <div className="modal fade" id="editSystemSettings" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                  <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLongTitle">Edit</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        <EditSystemSettings />
                      </div>
                      <div className="modal-footer">
                        <button onClick={refreshComponent} type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="tab-pane" id="localisation">
                <h6>Localisation Settings</h6><hr />
                <label className="d-block mb-0">Language</label>
                <div className="small text-muted mb-3">{'language' in localisationSettings && localisationSettings.language}</div>
                <label className="d-block mb-0">Date format</label>
                <div className="small text-muted mb-3">{'dateFormat' in localisationSettings && localisationSettings.dateFormat}</div>
                <label className="d-block mb-0">Currency</label>
                <div className="small text-muted mb-3">{'currency' in localisationSettings && localisationSettings.currency}</div>
                <label className="d-block mb-0">Currency symbol</label>
                <div className="small text-muted mb-3">{'currencySymbol' in localisationSettings && localisationSettings.currencySymbol}</div>
                <button className="btn btn-info" type="button" data-toggle="modal" data-target="#editLocalisationSettings">Edit</button>
                <button className="btn btn-warning" type="button">Restore to default</button>
                <div className="modal fade" id="editLocalisationSettings" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                  <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLongTitle">Edit</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        <EditLocalisationSettings />
                      </div>
                      <div className="modal-footer">
                        <button onClick={refreshComponent} type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="tab-pane" id="email">
                <h6>Email Settings</h6><hr />
                <label className="d-block mb-0">Email sent from address </label>
                <div className="small text-muted mb-3">{'emailSentAddress' in emailSettings && emailSettings.emailSentAddress}</div>
                <label className="d-block mb-0">SMTP server</label>
                <div className="small text-muted mb-3">{'smtp' in emailSettings && emailSettings.smtp}</div>
                <button className="btn btn-info" type="button" data-toggle="modal" data-target="#editEmailSettings">Edit</button>
                <button className="btn btn-warning" type="button">Restore to default</button>
                <div className="modal fade" id="editEmailSettings" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                  <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLongTitle">Edit</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        <EditEmailSettings />
                      </div>
                      <div className="modal-footer">
                        <button onClick={refreshComponent} type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="tab-pane" id="footer">
                <h6>Footer Settings</h6><hr />
                <label className="d-block mb-0">Show Footer</label>
                <div className="small text-muted mb-3">{'enableFooter' in footerSettings && convertToYesNoValue(footerSettings.enableFooter)}</div>
                <button className="btn btn-info" type="button" data-toggle="modal" data-target="#editFooterSettings">Edit</button>
                <button onClick={restoreFooterSettings} className="btn btn-warning" type="button">Restore to default</button>
                <div className="modal fade" id="editFooterSettings" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                  <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLongTitle">Edit</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        <EditFooterSettings />
                      </div>
                      <div className="modal-footer">
                        <button onClick={refreshComponent} type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="tab-pane" id="notifications">
                <h6>Notifications Settings</h6><hr />
                <label className="d-block mb-0">Show Notifications</label>
                <div className="small text-muted mb-3">{'showNotification' in notificationSettings && convertToYesNoValue(notificationSettings.showNotification)}</div>
                <button className="btn btn-info" type="button" data-toggle="modal" data-target="#editNotificationsSettings">Edit</button>
                <button className="btn btn-warning" type="button">Restore to default</button>
                <div className="modal fade" id="editNotificationsSettings" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                  <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLongTitle">Edit</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        <EditNotificationsSettings />
                      </div>
                      <div className="modal-footer">
                        <button onClick={refreshComponent} type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="tab-pane" id="about">
                <h6>About Settings</h6><hr />
                <label className="d-block mb-0">Version</label>
                <div className="small text-muted mb-3">1.0</div>
              </div>
              <div className="tab-pane" id="headerbar">
                <h6>Header Settings</h6><hr />
                <label className="d-block mb-0">Show search bar </label>
                <div className="small text-muted mb-3">{'enbaleSearchBar' in headerSettings && convertToYesNoValue(headerSettings.enbaleSearchBar)}</div>
                <label className="d-block mb-0">Show logo </label>
                <div className="small text-muted mb-3">{'showLogo' in headerSettings && convertToYesNoValue(headerSettings.showLogo)}</div>
                <button className="btn btn-info" type="button" data-toggle="modal" data-target="#editHeaderettings">Edit</button>
                <button onClick={restoreHeaderSettings} className="btn btn-warning" type="button">Restore to default</button>
                <div className="modal fade" id="editHeaderettings" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                  <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLongTitle">Edit</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        <EditHeaderSettings />
                      </div>
                      <div className="modal-footer">
                        <button onClick={refreshComponent} type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="tab-pane" id="dashboard">
                <h6>Dahboard Settings</h6><hr />
                <label className="d-block mb-0">Show Summary</label>
                <div className="small text-muted mb-3">{'showSummary' in dashboardSettings && convertToYesNoValue(dashboardSettings.showSummary)}</div>
                <label className="d-block mb-0">Show Calendar</label>
                <div className="small text-muted mb-3">{'showCalendar' in dashboardSettings && convertToYesNoValue(dashboardSettings.showCalendar)}</div>
                <label className="d-block mb-0">Show Charts</label>
                <div className="small text-muted mb-3">{'showExpenseIncomeCharts' in dashboardSettings && convertToYesNoValue(dashboardSettings.showExpenseIncomeCharts)}</div>
                <button className="btn btn-info" type="button" data-toggle="modal" data-target="#editDahboardSettings">Edit</button>
                <button onClick={restoreDashboardSettings} className="btn btn-warning" type="button">Restore to default</button>
                <div className="modal fade" id="editDahboardSettings" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                  <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLongTitle">Edit</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        <EditDashboardSettings />
                      </div>
                      <div className="modal-footer">
                        <button type="button" onClick={refreshComponent} className="btn btn-secondary" data-dismiss="modal">Close</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Configuration;
