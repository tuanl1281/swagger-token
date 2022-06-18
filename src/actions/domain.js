/* eslint-disable no-multi-assign */
import types from 'actions/types';

const selectDomain = (payload) => ({ type: types.SELECT_DOMAIN, payload });

const createDomain = (payload) => ({ type: types.CREATE_DOMAIN, payload });
const updateDomain = (payload) => ({ type: types.UPDATE_DOMAIN, payload });
const deleteDomain = (payload) => ({ type: types.DELETE_DOMAIN, payload });

export { selectDomain, createDomain, updateDomain, deleteDomain };
