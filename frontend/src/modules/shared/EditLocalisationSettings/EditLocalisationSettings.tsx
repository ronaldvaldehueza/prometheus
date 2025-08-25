
import './EditLocalisationSettings.css';
import { useForm } from 'react-hook-form';
import settingsHTTPService from '../../../main/services/settingsHTTPService';
import showMessage from '../../../libraries/messages/messages';
import React, { useEffect, useState } from 'react';
import CurrentUser from '../../../main/config/user';

interface LocalisationSettings {
  id: number;
  language: string;
  currency: string;
  currencySymbol: string;
  dateFormat: string;
}

const EditLocalisationSettings: React.FC = () => {
  const { register, handleSubmit, errors } = useForm();
  const [localisationSettings, setLocalisationSettings] = useState<LocalisationSettings | undefined>();

  useEffect(() => {
    getLocalisationSettings();
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    if (localisationSettings) {
      setLocalisationSettings({ ...localisationSettings, [name]: value });
    }
  };

  const getLocalisationSettings = () => {
    settingsHTTPService.getLocalisationSettings().then(response => {
      setLocalisationSettings(response.data[0]);
    });
  };

  const onSubmit = (data: any) => {
    if (localisationSettings) {
      settingsHTTPService.editLocalisationSettings(localisationSettings.id, data).then(() => {
        showMessage('Confirmation', CurrentUser.SETTINGS_UPDATE_MSG, 'success');
      });
    }
  };

  return (
    <div className="EditDashboardSettings">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group row">
          <label htmlFor="language" className="col-4 col-form-label">Language</label>
          <div className="col-8">
            <select onChange={handleInputChange} value={localisationSettings?.language} ref={register({ required: true })}
              id="language" name="language" className="custom-select">
              <option value="English">English</option>
            </select>
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="currency" className="col-4 col-form-label">Currency</label>
          <div className="col-8">
            <select onChange={handleInputChange} value={localisationSettings?.currency} ref={register({ required: true })}
              id="currency" name="currency" className="custom-select">
              <option value="USD">USD</option>
            </select>
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="currencySymbol" className="col-4 col-form-label">Currency Symbol</label>
          <div className="col-8">
            <select onChange={handleInputChange} value={localisationSettings?.currencySymbol} ref={register({ required: true })}
              id="currencySymbol" name="currencySymbol" className="custom-select">
              <option value="$">$</option>
            </select>
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="dateFormat" className="col-4 col-form-label">Date format</label>
          <div className="col-8">
            <select onChange={handleInputChange} value={localisationSettings?.dateFormat} ref={register({ required: true })}
              id="dateFormat" name="dateFormat" className="custom-select">
              <option value="dd//mm/yyyy">dd//mm/yyyy</option>
              <option value="dd-mm-yyyy">dd-mm-yyyy</option>
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

export default EditLocalisationSettings;