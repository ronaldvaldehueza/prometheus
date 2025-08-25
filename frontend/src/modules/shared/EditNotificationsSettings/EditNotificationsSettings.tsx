
import './EditNotificationsSettings.css';
import { useForm } from 'react-hook-form';
import settingsHTTPService from '../../../main/services/settingsHTTPService';
import showMessage from '../../../libraries/messages/messages';
import React, { useEffect, useState } from 'react';
import CurrentUser from '../../../main/config/user';

interface NotificationSettings {
  id: number;
  showNotification: string;
}

const EditNotificationsSettings: React.FC = () => {
  const { register, handleSubmit, errors } = useForm();
  const [notificationsSettings, setNotificationsSettings] = useState<NotificationSettings | undefined>();

  useEffect(() => {
    getNotificationsSettings();
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    if (notificationsSettings) {
      setNotificationsSettings({ ...notificationsSettings, [name]: value });
    }
  };

  const getNotificationsSettings = () => {
    settingsHTTPService.getNotificationSettings().then(response => {
      setNotificationsSettings(response.data[0]);
    });
  };

  const onSubmit = (data: any) => {
    if (notificationsSettings) {
      settingsHTTPService.editNotificationsSettings(notificationsSettings.id, data).then(() => {
        showMessage('Confirmation', CurrentUser.SETTINGS_UPDATE_MSG, 'success');
      });
    }
  };

  return (
    <div className="EditDashboardSettings">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group row">
          <label htmlFor="showNotification" className="col-4 col-form-label">Show Notifications</label>
          <div className="col-8">
            <select onChange={handleInputChange} value={notificationsSettings?.showNotification} ref={register({ required: true })}
              id="showNotification" name="showNotification" className="custom-select">
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
          </div>
        </div>

        <div className="form-group row">
          <div className="offset-4 col-8">
            <button name="submit" type="submit" className="btn btn-primary"><i className="far fa-save"></i>
              Save</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditNotificationsSettings;