import {FC, ReactNode, createContext, useContext, useState} from 'react';
import {ColorType, Colors} from 'src/common/colors';
import {FontPalettes, Fonts} from 'src/common/fonts';

type ThemeContextType = {
  colors: ColorType;
  fonts: FontPalettes;
};

type ThemeProviderProps = {
  children: ReactNode;
};

const ThemeContext = createContext<any>(null);

export const ThemeProvider: FC<ThemeProviderProps> = props => {
  const {children} = props;
  const colors = Colors.light;
  const fonts = Fonts;

  return (
    <ThemeContext.Provider value={{colors, fonts}}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  return useContext(ThemeContext);
};
