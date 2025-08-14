import React from 'react';
import PropTypes from 'prop-types';
import './EditMyTask.css';

const EditMyTask = () => (
  <div className="EditMyTask">
    <form action="http://timwork-saas.waptechy.com/todo/create" method="POST" className="">
      <div className="row">
        <div className="form-group col-md-12">
          <label>Tache<span className="text-danger">*</span></label>
          <textarea type="text" name="todo" className="form-control"></textarea>
        </div>
        <div className="form-group col-md-12">
          <label>date échéance<span className="text-danger">*</span></label>
          <input type="text" name="due_date" className="form-control datepicker" />
        </div>
      </div>
      <button className="d-none" id="fire-modal-2-submit"></button></form>
  </div>
);

EditMyTask.propTypes = {};

EditMyTask.defaultProps = {};

export default EditMyTask;
