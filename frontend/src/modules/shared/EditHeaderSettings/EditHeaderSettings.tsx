import './EditHeaderSettings.css';
import { useForm } from 'react-hook-form';
import settingsHTTPService from '../../../main/services/settingsHTTPService';
import showMessage from '../../../libraries/messages/messages';
import React, { useEffect, useState } from 'react';
import CurrentUser from '../../../main/config/user';

interface HeaderSettings {
  id: number;
  enbaleSearchBar: string;
  showLogo: string;
}

const EditHeaderSettings: React.FC = () => {
  const { register, handleSubmit, errors } = useForm();
  const [headerSettings, setHeaderSettings] = useState<HeaderSettings | undefined>();

  useEffect(() => {
    getHeaderSettings();
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    if (headerSettings) {
      setHeaderSettings({ ...headerSettings, [name]: value });
    }
  };

  const getHeaderSettings = () => {
    settingsHTTPService.getHeaderSettings().then(response => {
      setHeaderSettings(response.data[0]);
    });
  };

  const onSubmit = (data: any) => {
    if (headerSettings) {
      settingsHTTPService.editHeaderSettings(headerSettings.id, data).then(() => {
        showMessage('Confirmation', CurrentUser.SETTINGS_UPDATE_MSG, 'success');
        getHeaderSettings();
      });
    }
  };

  return (
    <div className="EditDashboardSettings">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group row">
          <label htmlFor="enbaleSearchBar" className="col-4 col-form-label">Show search Bar</label>
          <div className="col-8">
            <select onChange={handleInputChange} value={headerSettings?.enbaleSearchBar} ref={register({ required: true })}
              id="enbaleSearchBar" name="enbaleSearchBar" className="custom-select">
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="showLogo" className="col-4 col-form-label">Show logo</label>
          <div className="col-8">
            <select onChange={handleInputChange} value={headerSettings?.showLogo} ref={register({ required: true })}
              id="showLogo" name="showLogo" className="custom-select">
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

export default EditHeaderSettings;