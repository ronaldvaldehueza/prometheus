import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './ProjectInProgress.css';
import projectHTTPService from '../../../main/services/projectHTTPService';

const ProjectInProgress = () => {

  const [projectsss, setProjectsss] = useState([]);


  useEffect(() => {

    projectHTTPService.getTopProject().then(data => {
      setProjectsss(data.data)
    })


  }, []);
  return (
    <div className="col-lg-6 col-xl-12">
      <div className="card br-0">
        <div className="card-body">
          <h4 className="box-title">Open Projects </h4>
        </div>
        <div className="card-body">
          <ul className="list-group">
            {Array.isArray(projectsss) && projectsss && projectsss.map(item =>
              <li key={item.id} className="list-group-item">{item.title}</li>

            )}
          </ul>
        </div>
      </div>
    </div>
  )
};

ProjectInProgress.propTypes = {};

ProjectInProgress.defaultProps = {};

export default ProjectInProgress;
