/* eslint-disable no-multi-assign */
import types from 'actions/types';

const createToken = (payload, id) => ({ type: types.CREATE_TOKEN, payload: { ...payload, domainId: id } });
const updateToken = (payload, id) => ({ type: types.UPDATE_TOKEN, payload: { ...payload, domainId: id } });
const deleteToken = (payload, id) => ({ type: types.DELETE_TOKEN, payload: { ...payload, domainId: id } });

const setFavoriteToken = (payload, id) => ({ type: types.SET_FAVORITE_TOKEN, payload: { ...payload, domainId: id } });

export { createToken, updateToken, deleteToken, setFavoriteToken };
