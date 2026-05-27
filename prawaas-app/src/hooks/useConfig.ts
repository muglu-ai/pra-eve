import React, { createContext, useContext } from 'react';
import { EventConfig, ThemeConfig } from '../types';
import { eventConfig } from '../config/eventConfig';

interface ConfigContextValue {
  event: EventConfig;
  theme: ThemeConfig;
}

const ConfigContext = createContext<ConfigContextValue>({
  event: eventConfig,
  theme: eventConfig.theme,
});

export const ConfigProvider: React.FC<{
  config?: EventConfig;
  children: React.ReactNode;
}> = ({ config = eventConfig, children }) => {
  return React.createElement(
    ConfigContext.Provider,
    { value: { event: config, theme: config.theme } },
    children,
  );
};

export const useConfig = () => useContext(ConfigContext);
export const useTheme = () => useContext(ConfigContext).theme;
export const useEvent = () => useContext(ConfigContext).event;
