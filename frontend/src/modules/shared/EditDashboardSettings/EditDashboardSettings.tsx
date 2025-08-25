import './EditDashboardSettings.css';
import { useForm } from 'react-hook-form';
import settingsHTTPService from '../../../main/services/settingsHTTPService';
import showMessage from '../../../libraries/messages/messages';
import React, { useEffect, useState } from 'react';
import CurrentUser from '../../../main/config/user';

interface DashboardSettings {
  id: number;
  showSummary: string;
  showCalendar: string;
  showExpenseIncomeCharts: string;
}

const EditDashboardSettings: React.FC = () => {
  const { register, handleSubmit, errors } = useForm();
  const [dashboardSettings, setDashboardSettings] = useState<DashboardSettings | undefined>();

  useEffect(() => {
    getDashboardSettings();
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    if (dashboardSettings) {
      setDashboardSettings({ ...dashboardSettings, [name]: value });
    }
  };

  const getDashboardSettings = () => {
    settingsHTTPService.getDashboardSettings().then(response => {
      setDashboardSettings(response.data[0]);
    });
  };

  const onSubmit = (data: any) => {
    if (dashboardSettings) {
      settingsHTTPService.editDashboardSettings(dashboardSettings.id, data).then(() => {
        showMessage('Confirmation', CurrentUser.SETTINGS_UPDATE_MSG, 'success');
      });
    }
  };

  return (
    <div className="EditDashboardSettings">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group row">
          <label htmlFor="select2" className="col-4 col-form-label">Show Summary</label>
          <div className="col-8">
            <select onChange={handleInputChange} value={dashboardSettings?.showSummary} ref={register({ required: true })}
              id="select2" name="showSummary" className="custom-select">
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="select2" className="col-4 col-form-label">Show Calendar</label>
          <div className="col-8">
            <select onChange={handleInputChange} value={dashboardSettings?.showCalendar} ref={register({ required: true })}
              id="select2" name="showCalendar" className="custom-select">
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="select2" className="col-4 col-form-label">Show Charts</label>
          <div className="col-8">
            <select onChange={handleInputChange} value={dashboardSettings?.showExpenseIncomeCharts} ref={register({ required: true })}
              id="select2" name="showExpenseIncomeCharts" className="custom-select">
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

export default EditDashboardSettings;