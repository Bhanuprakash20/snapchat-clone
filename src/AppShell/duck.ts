import { Drawer } from 'AppShell/types';

// Action types
const SHOW_DRAWER = 'SHOW_DRAWER';
const HIDE_DRAWER = 'HIDE_DRAWER';

// Action creators
export const showDrawer = (drawer: Drawer) => (dispatch) => {
  const defaults = {
    animationIn: 'slideInUp',
    animationOut: 'slideOutDown',
    animationInDuration: 300,
    animationOutDuration: 300,
    theme: 'light'
  };
  dispatch({
    type: SHOW_DRAWER,
    drawer: { ...defaults, ...drawer }
  });
};

export const hideDrawer = (component) => (dispatch) =>
  dispatch({ type: HIDE_DRAWER, component });

// Reducer
const initialState = {
  drawers: [
    {
      animationIn: 'zoomIn',
      animationOut: 'zoomOut',
      animationInDuration: 300,
      animationOutDuration: 300,
      // theme: 'dark',
      component: 'search',
      show: true
    }
  ]
};

const setShowDrawer = (prevState, drawer) => {
  const currentDrawerRemoved = prevState.drawers.filter(
    ({ component }) => component !== drawer.component
  );
  const drawers = [
    ...currentDrawerRemoved,
    {
      ...drawer,
      show: true
    }
  ];
  return { ...prevState, drawers };
};

const setHideDrawer = (prevState, component) => {
  const drawers = prevState.drawers.map((drawer) => {
    if (drawer.component === component)
      return {
        ...drawer,
        show: false
      };
    return drawer;
  });
  return { ...prevState, drawers };
};

export default function reducer(prevState = initialState, { type, drawer, component }) {
  switch (type) {
    case SHOW_DRAWER:
      return setShowDrawer(prevState, drawer);
    case HIDE_DRAWER:
      return setHideDrawer(prevState, component);
    default:
      return prevState;
  }
}