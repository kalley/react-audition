// @flow
import { combineReducers } from 'redux';
import entities, { type State as EntityState } from './entities';
import ui, { type State as UIState } from './ui';

export type ReduxState = {
  entities: EntityState,
  ui: UIState
};

export default combineReducers({
  entities,
  ui
});
