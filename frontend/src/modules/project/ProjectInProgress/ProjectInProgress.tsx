import React, { useEffect, useState } from 'react';
import './ProjectInProgress.css';
import projectHTTPService from '../../../main/services/projectHTTPService';

interface ProjectData {
  id: number;
  title: string;
}

const ProjectInProgress: React.FC = () => {
  const [projectsss, setProjectsss] = useState<ProjectData[]>([]);

  useEffect(() => {
    projectHTTPService.getTopProject().then((response: { data: ProjectData[] }) => {
      setProjectsss(response.data);
    });
  }, []);

  return (
    <div className="col-lg-6 col-xl-12">
      <div className="card br-0">
        <div className="card-body">
          <h4 className="box-title">Open Projects </h4>
        </div>
        <div className="card-body">
          <ul className="list-group">
            {projectsss.map(item =>
              <li key={item.id} className="list-group-item">{item.title}</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProjectInProgress;
