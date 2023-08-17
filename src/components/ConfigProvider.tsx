import { createContext, useReducer, useMemo, useEffect } from "react";
import { ConfigProviderReducer } from "./ConfigProviderReducer";

export type Action =
  | { type: 'SET_PROMPT'; payload: string }
  | { type: 'SET_RESPONSE'; payload: string }
  | { type: 'SET_WORKSPACE_ID'; payload: string }
  | { type: 'SET_ORGANIZATION_ID'; payload: string };

export interface ConfigProviderState {
  prompt: string;
  response: string;
  workspaceId: string;
  organizationId: string;
  setPrompt: (prompt: string) => void;
  setResponse: (response: string) => void;
  setWorkspaceId: (workspaceId: string) => void;
  setOrganizationId: (organizationId: string) => void;
}

export interface ConfigProviderProps {
  children: JSX.Element;
}

const initialState: ConfigProviderState = {
  prompt: '',
  response: '',
  workspaceId: '',
  organizationId: '',
  setPrompt: () => undefined,
  setResponse: () => undefined,
  setWorkspaceId: () => undefined,
  setOrganizationId: () => undefined,
};

export const ConfigContext = createContext(initialState);

export const ConfigProvider = ({ children }: ConfigProviderProps): JSX.Element => {
  const [state, dispatch] = useReducer(ConfigProviderReducer, initialState);
  console.log("ConfigProvider state:", state.organizationId);

  const value = useMemo(() => ({
    ...state,
    setPrompt: (prompt: string) => dispatch({ type: 'SET_PROMPT', payload: prompt }),
    setResponse: (response: string) => dispatch({ type: 'SET_RESPONSE', payload: response }),
    setWorkspaceId: (workspaceId: string) => dispatch({ type: 'SET_WORKSPACE_ID', payload: workspaceId }),
    setOrganizationId: (organizationId: string) => dispatch({ type: 'SET_ORGANIZATION_ID', payload: organizationId })
  }), [state]);

  return (
    <ConfigContext.Provider value={value}>
      {children}
    </ConfigContext.Provider>

  );
};
