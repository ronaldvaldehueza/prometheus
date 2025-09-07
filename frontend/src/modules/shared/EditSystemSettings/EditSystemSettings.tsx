import './EditSystemSettings.css';
import { useForm } from 'react-hook-form';
import settingsHTTPService from '../../../main/services/settingsHTTPService';
import showMessage from '../../../libraries/messages/messages';
import React, { useEffect, useState } from 'react';
import CurrentUser from '../../../main/config/user';

interface SystemSettings {
  id: number;
  appName: string;
  showLogo: string;
  email: string;
  address: string;
  entrepriseName: string;
}

const EditSystemSettings: React.FC = () => {
  const { register, handleSubmit, errors } = useForm();
  const [systemSettings, setSystemSettings] = useState<SystemSettings | undefined>();

  useEffect(() => {
    getSystemSettings();
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    if (systemSettings) {
      setSystemSettings({ ...systemSettings, [name]: value });
    }
  };

  const getSystemSettings = () => {
    settingsHTTPService.getSystemSettings().then(response => {
      setSystemSettings(response.data[0]);
    });
  };

  const onSubmit = (data: any) => {
    if (systemSettings) {
      settingsHTTPService.editSystemSettings(systemSettings.id, data).then(() => {
        showMessage('Confirmation', CurrentUser.SETTINGS_UPDATE_MSG, 'success');
      });
    }
  };

  return (
    <div className="EditDashboardSettings">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group row">
          <label htmlFor="appName" className="col-4 col-form-label">Application Name</label>
          <div className="col-8">
            <input onChange={handleInputChange} value={systemSettings?.appName || ''} ref={register({ required: true })}
              id="appName" name="appName" type="text" className="form-control" />
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="showLogo" className="col-4 col-form-label">Show Logo</label>
          <div className="col-8">
            <select onChange={handleInputChange} value={systemSettings?.showLogo} ref={register({ required: true })}
              id="showLogo" name="showLogo" className="custom-select">
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="email" className="col-4 col-form-label">Email</label>
          <div className="col-8">
            <input onChange={handleInputChange} value={systemSettings?.email || ''} ref={register({ required: true })}
              id="email" name="email" type="text" className="form-control" />
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="address" className="col-4 col-form-label">Address</label>
          <div className="col-8">
            <input onChange={handleInputChange} value={systemSettings?.address || ''} ref={register({ required: true })}
              id="address" name="address" type="text" className="form-control" />
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="entrepriseName" className="col-4 col-form-label">Entreprise Name</label>
          <div className="col-8">
            <input onChange={handleInputChange} value={systemSettings?.entrepriseName || ''} ref={register({ required: true })}
              id="entrepriseName" name="entrepriseName" type="text" className="form-control" />
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

export default EditSystemSettings;