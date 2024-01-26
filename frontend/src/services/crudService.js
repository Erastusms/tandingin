import React from 'react'
import http from '../http-common';
const createLeague = data => {
  return http.post("/admin/league", data);
};

const crudService = {

  createLeague,

};
export default crudService