import { createContext, useReducer, useMemo } from "react";
import { ConfigProviderReducer } from "./ConfigProviderReducer";

export type Action =
  | { type: 'SET_PROMPT'; payload: string }
  | { type: 'SET_RESPONSE'; payload: { [key: string]: string }[] }
  | { type: 'SET_WORKSPACE_ID'; payload: string }
  | { type: 'SET_ORGANIZATION_ID'; payload: string }
  | { type: 'SET_INDUSTRY'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean };

export interface ConfigProviderState {
  prompt: string;
  response: { [key: string]: string }[];
  workspaceId: string;
  organizationId: string;
  industry: string;
  loading: boolean;
  setPrompt: (prompt: string) => void;
  setResponse: (response: { [key: string]: string }[]) => void;
  setWorkspaceId: (workspaceId: string) => void;
  setOrganizationId: (organizationId: string) => void;
  setIndustry: (industry: string) => void;
  setLoading: (loading: boolean) => void;
}

export interface ConfigProviderProps {
  children: JSX.Element;
}

const initialState: ConfigProviderState = {
  prompt: '',
  response: [],
  workspaceId: '',
  organizationId: '',
  industry: '',
  loading: false,
  setPrompt: () => undefined,
  setResponse: () => undefined,
  setWorkspaceId: () => undefined,
  setOrganizationId: () => undefined,
  setIndustry: () => undefined,
  setLoading: () => undefined,
};

export const ConfigContext = createContext(initialState);

export const ConfigProvider = ({ children }: ConfigProviderProps): JSX.Element => {
  const [state, dispatch] = useReducer(ConfigProviderReducer, initialState);

  const value = useMemo(() => ({
    ...state,
    setPrompt: (prompt: string) => dispatch({ type: 'SET_PROMPT', payload: prompt }),
    setResponse: (response: { [key: string]: string }[]) => dispatch({ type: 'SET_RESPONSE', payload: response }),
    setWorkspaceId: (workspaceId: string) => dispatch({ type: 'SET_WORKSPACE_ID', payload: workspaceId }),
    setOrganizationId: (organizationId: string) => dispatch({ type: 'SET_ORGANIZATION_ID', payload: organizationId }),
    setIndustry: (industry: string) => dispatch({ type: 'SET_INDUSTRY', payload: industry }),
    setLoading: (loading: boolean) => dispatch({ type: 'SET_LOADING', payload: loading }),
  }), [state]);

  return (
    <ConfigContext.Provider value={value}>
      {children}
    </ConfigContext.Provider>

  );
};
