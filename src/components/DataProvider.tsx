import { createContext, useReducer, useMemo, useEffect } from "react";

type Action =
  | { type: 'SET_PROMPT', payload: string }
  | { type: 'SET_RESPONSE', payload: string };

interface ConfigProviderState {
  prompt: string;
  response: string;
}

export const ConfigProviderReducer = (state: ConfigProviderState, action: Action): ConfigProviderState => {
  switch (action.type) {
    case 'SET_PROMPT':
      return {
        ...state,
        prompt: action.payload,
      };
    case 'SET_RESPONSE':
      return {
        ...state,
        response: action.payload,
      };
    default:
      return state;
  }
};

interface ConfigProviderState {
  prompt: string;
  response: string;
  setPrompt: (prompt: string) => void;
  setResponse: (response: string) => void;
}

interface ConfigProviderProps {
  children: JSX.Element[];
}

const initialState: ConfigProviderState = {
  prompt: '',
  response: '',
  setPrompt: () => undefined,
  setResponse: () => undefined,
};

export const ConfigContext = createContext(initialState);

export const ConfigProvider = ({ children }: ConfigProviderProps): JSX.Element => {
  const [state, dispatch] = useReducer(ConfigProviderReducer, initialState);

  const value = useMemo(() => ({
    ...state,
    setPrompt: (prompt: string) => dispatch({ type: 'SET_PROMPT', payload: prompt }),
    setResponse: (response: string) => dispatch({ type: 'SET_RESPONSE', payload: response }),
  }), [state]);

  useEffect(() => { console.log(state.prompt); }, [state]);

  return (
    <ConfigContext.Provider value={value}>
      {children}
    </ConfigContext.Provider>

  );
};
