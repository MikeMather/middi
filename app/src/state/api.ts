import env from '../env';
import dispatchHelper from './dispatchHelper';
import { authenticatedIntroSequence, unauthenticatedIntroSequence } from '../sequences/introduction';
import { AppState } from '../types';
import { AUTH_STATE_CHANGED, SET_HABITS, SET_STATE } from './appReducer';

export const getAuthorizedUser = (appState: AppState) => {
    return fetch(`${env.apiUrl}/auth/auth-user`, {
      credentials: 'include',
    })
    .then(res => res.json())
    .then(res => {
      // authenticated user
      if (res.user) {
        dispatchHelper.dispatch({
          type: SET_STATE,
          payload: {
            ...appState,
            messages: authenticatedIntroSequence(res.user.name)
          }
        });
        dispatchHelper.dispatch({
          type: AUTH_STATE_CHANGED,
          payload: {
            loggedIn: true,
            name: res.user.name
          }
        });
      }
      else {
        // unauthenticated user
        dispatchHelper.dispatch({
          type: SET_STATE,
          payload: {
            ...appState,
            messages: unauthenticatedIntroSequence()
          }
        });
      }
    })
    .catch(res => {
      // unauthenticated user
      dispatchHelper.dispatch({
        type: SET_STATE,
        payload: {
          ...appState,
          messages: unauthenticatedIntroSequence()
        }
      });
    });
}

export const getHabits = () => {
    return fetch(`${env.apiUrl}/habits`, {
        credentials: 'include',
    })
    .then(res => res.json())
    .then(res => {
        if (res.err) {
          console.log(res.error);
        }
        else {
          dispatchHelper.dispatch({
            type: SET_HABITS,
            payload: res.habits
          })
        }
    });
} 

export const addPuff = () => {}