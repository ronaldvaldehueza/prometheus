import React from 'react';
import './EditMyTask.css';

const EditMyTask: React.FC = () => (
  <div className="EditMyTask">
    <form action="http://timwork-saas.waptechy.com/todo/create" method="POST" className="">
      <div className="row">
        <div className="form-group col-md-12">
          <label>Tache<span className="text-danger">*</span></label>
          <textarea name="todo" className="form-control"></textarea>
        </div>
        <div className="form-group col-md-12">
          <label>date échéance<span className="text-danger">*</span></label>
          <input type="text" name="due_date" className="form-control datepicker" />
        </div>
      </div>
      <button className="d-none" id="fire-modal-2-submit"></button></form>
  </div>
);

export default EditMyTask;
