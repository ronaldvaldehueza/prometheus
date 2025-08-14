import React from 'react';
import PropTypes from 'prop-types';
import './ConfigurationModules.css';

const ConfigurationModules = () => (
  <div className="container">





    <div className="row gutters-sm">
      <div className="col-md-4 d-none d-md-block">
        <div className="card">
          <div className="card-body">
            <nav className="nav flex-column nav-pills nav-gap-y-1">
              <a href="#project" data-toggle="tab" className="nav-item nav-link has-icon nav-link-faded active">
                Project
              </a>
              <a href="#tasks" data-toggle="tab" className="nav-item nav-link has-icon nav-link-faded">
                Tasks
              </a>
              <a href="#mytasks" data-toggle="tab" className="nav-item nav-link has-icon nav-link-faded">
                My tasks
              </a>
              <a href="#users" data-toggle="tab" className="nav-item nav-link has-icon nav-link-faded">
                Users
              </a>
              <a href="#client" data-toggle="tab" className="nav-item nav-link has-icon nav-link-faded">
                Client
              </a>

            </nav>
          </div>
        </div>
      </div>
      <div className="col-md-8">
        <div className="card">

          <div className="card-body tab-content">
            <div className="tab-pane active" id="project">
              <h6>Project Settings</h6><hr />
              <form>
                <div className="form-group">
                  <label className="d-block mb-0">Default theme color</label>
                  <div className="small text-muted mb-3">Blue</div>

                  <label className="d-block mb-0">App Title</label>
                  <div className="small text-muted mb-3">ProMa</div>

                  <label className="d-block mb-0">Signin page background</label>
                  <div className="small text-muted mb-3">Yes</div>

                  <label className="d-block mb-0">Show logo in signin page</label>
                  <div className="small text-muted mb-3">Yes</div>

                  <label className="d-block mb-0">Entreprise Name</label>
                  <div className="small text-muted mb-3">World Cloud 9</div>

                  <label className="d-block mb-0">Address</label>
                  <div className="small text-muted mb-3">Cagayan de Oro, Philippines</div>

                  <label className="d-block mb-0">email</label>
                  <div className="small text-muted mb-3">contact@worldcloud9.com</div>


                  <button className="btn btn-info" type="button">Edit</button>
                  <button className="btn btn-warning" type="button">Restore to default</button>
                </div>
              </form>
            </div>
            <div className="tab-pane" id="tasks">
              <h6>Tasks Settings</h6><hr />
              <label className="d-block mb-0">Language</label>
              <div className="small text-muted mb-3">English</div>
              <label className="d-block mb-0">Time zone</label>
              <div className="small text-muted mb-3">GMT+2</div>
              <label className="d-block mb-0">Date format</label>
              <div className="small text-muted mb-3">dd-mm-yyyy</div>
              <label className="d-block mb-0">Currency</label>
              <div className="small text-muted mb-3">USD</div>
              <label className="d-block mb-0">Currency symbol</label>
              <div className="small text-muted mb-3">$</div>
              <button className="btn btn-info" type="button">Edit</button>
              <button className="btn btn-warning" type="button">Restore to default</button>
            </div>
            <div className="tab-pane" id="mytasks">
              <h6>My tasks Settings</h6><hr />
              <label className="d-block mb-0">info@demo.com  </label>
              <div className="small text-muted mb-3">Email sent from address  </div>
              <label className="d-block mb-0">ProMa</label>
              <div className="small text-muted mb-3">Email sent from name</div>
              <label className="d-block mb-0">smtp.mail.com</label>
              <div className="small text-muted mb-3">SMTP server</div>

              <button className="btn btn-info" type="button">Edit</button>
              <button className="btn btn-warning" type="button">Restore to default</button>


            </div>
            <div className="tab-pane" id="users">
              <h6>Users Settings</h6><hr />
              <label className="d-block mb-0">sdfsfrgsdf</label>
              <div className="small text-muted mb-3">Projects</div>

              <button className="btn btn-info" type="button">Edit</button>
              <button className="btn btn-warning" type="button">Restore to default</button>

            </div>
            <div className="tab-pane" id="client">
              <h6>Client Settings</h6><hr />
              <label className="d-block mb-0">Yes</label>
              <div className="small text-muted mb-3">Enable Left Menu</div>

              <button className="btn btn-info" type="button">Edit</button>
              <button className="btn btn-warning" type="button">Restore to default</button>

            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
);

ConfigurationModules.propTypes = {};

ConfigurationModules.defaultProps = {};

export default ConfigurationModules;
