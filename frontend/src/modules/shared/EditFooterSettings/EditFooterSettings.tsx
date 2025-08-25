import './EditFooterSettings.css';
import { useForm } from 'react-hook-form';
import settingsHTTPService from '../../../main/services/settingsHTTPService';
import showMessage from '../../../libraries/messages/messages';
import React, { useEffect, useState } from 'react';
import CurrentUser from '../../../main/config/user';

interface FooterSettings {
  id: number;
  enableFooter: string;
  enableCopyRightTest: string;
}

const EditFooterSettings: React.FC = () => {
  const { register, handleSubmit, errors } = useForm();
  const [footerSettings, setFooterSettings] = useState<FooterSettings | undefined>();

  useEffect(() => {
    getFooterSettings();
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    if (footerSettings) {
      setFooterSettings({ ...footerSettings, [name]: value });
    }
  };

  const getFooterSettings = () => {
    settingsHTTPService.getFooterSettings().then(response => {
      setFooterSettings(response.data[0]);
    });
  };

  const onSubmit = (data: any) => {
    if (footerSettings) {
      settingsHTTPService.editFooterSettings(footerSettings.id, data).then(() => {
        showMessage('Confirmation', CurrentUser.SETTINGS_UPDATE_MSG, 'success');
      });
    }
  };

  return (
    <div className="EditDashboardSettings">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group row">
          <label htmlFor="enableFooter" className="col-4 col-form-label">Show footer</label>
          <div className="col-8">
            <select onChange={handleInputChange} value={footerSettings?.enableFooter} ref={register({ required: true })}
              id="enableFooter" name="enableFooter" className="custom-select">
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="enableCopyRightTest" className="col-4 col-form-label">Show copy right</label>
          <div className="col-8">
            <select onChange={handleInputChange} value={footerSettings?.enableCopyRightTest} ref={register({ required: true })}
              id="enableCopyRightTest" name="enableCopyRightTest" className="custom-select">
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

export default EditFooterSettings;