import {createNavigationContainerRef} from '@react-navigation/native';
import {Keyboard} from 'react-native';
import {SCREENS} from './ScreensRouter';
export const navigationRef: any = createNavigationContainerRef();

export function navigate(name: any, params: any = {}) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

export function getNavigation() {
  Keyboard.dismiss();
  return navigationRef;
}

export function getRoute() {
  return getNavigation()?.getCurrentRoute();
}

export function goBack() {
  const currentRoute = getRoute()?.name;
  if (
    currentRoute !== SCREENS.DASHBOARD.name &&
    currentRoute !== SCREENS.LOGIN.name &&
    getNavigation().isReady()
  ) {
    getNavigation()?.canGoBack() && getNavigation()?.goBack();
  }
}
