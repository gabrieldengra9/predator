import Immutable from 'immutable';
import * as Types from '../types/configTypes'

const initialState = Immutable.Map({
  config: undefined,
  config_data_map: undefined,
  processing_get_config: false,
  processing_get_config_data_map: false,
  processing_update_config: false,
  error_get_config: undefined,
  error_update_config: undefined
});

export default function reduce (state = initialState, action = {}) {
  console.log(action)
  switch (action.type) {
  case Types.GET_CONFIG_SUCCESS:
    return state.set('config', action.config);
  case Types.GET_CONFIG_DATA_MAP_SUCCESS:
    return state.set('config_data_map', action.config_data_map);
  case Types.UPDATE_CONFIG:
    return state.set('config', action.config);
  case Types.PROCESSING_GET_CONFIG:
    return state.set('processing_get_config', action.state);
  case Types.PROCESSING_UPDATE_CONFIG:
    return state.set('processing_update_config', action.state);
  case Types.PROCESSING_GET_CONFIG_DATA_MAP:
    return state.set('processing_get_config_data_map', action.state);
  case Types.GET_CONFIG_FAILURE:
    return state.set('error_get_config', action.error);
  case Types.UPDATE_CONFIG_FAILURE:
    return state.set('error_update_config', action.error);
  case Types.CLEAR_ERROR_ON_UPDATE_CONFIG:
    return state.set('error_update_config', undefined);
  default:
    return state;
  }
}
