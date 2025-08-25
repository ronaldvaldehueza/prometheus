import './EditEmailSettings.css';
import { useForm } from 'react-hook-form';
import settingsHTTPService from '../../../main/services/settingsHTTPService';
import showMessage from '../../../libraries/messages/messages';
import React, { useEffect, useState } from 'react';

interface EmailSettings {
  id: number;
  smtp: string;
  emailSentAddress: string;
}

const EditEmailSettings: React.FC = () => {
  const { register, handleSubmit, errors } = useForm();
  const [emailSettings, setEmailSettings] = useState<EmailSettings | undefined>();

  useEffect(() => {
    getEmailSettings();
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (emailSettings) {
      setEmailSettings({ ...emailSettings, [name]: value });
    }
  };

  const getEmailSettings = () => {
    settingsHTTPService.getEmailSettings().then(response => {
      setEmailSettings(response.data[0]);
    });
  };

  const onSubmit = (data: any) => {
    if (emailSettings) {
      settingsHTTPService.editEmailSettings(emailSettings.id, data).then(() => {
        showMessage('Confirmation', 'Settings updated successfully', 'success');
      });
    }
  };

  return (
    <div className="EditDashboardSettings">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group row">
          <label htmlFor="smtp" className="col-4 col-form-label">SMTP</label>
          <div className="col-8">
            <input onChange={handleInputChange} value={emailSettings?.smtp || ''} ref={register({ required: true })}
              id="smtp" name="smtp" type="text" className="form-control" />
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="emailSentAddress" className="col-4 col-form-label">Email address</label>
          <div className="col-8">
            <input onChange={handleInputChange} value={emailSettings?.emailSentAddress || ''} ref={register({ required: true })}
              id="emailSentAddress" name="emailSentAddress" type="text" className="form-control" />
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

export default EditEmailSettings;