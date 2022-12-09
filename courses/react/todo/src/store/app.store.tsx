import React, {
  ComponentProps,
  createContext,
  ElementType,
  ReactNode,
  useContext,
  useState,
} from "react";

type InitialState = {
  showEdit: boolean;
  editTodoId: number;
};

const initialState: InitialState = {
  showEdit: false,
  editTodoId: -1,
};

export type AppStateType = {
  state: InitialState;
  setState: (state: InitialState) => void;
};

const AppState = createContext<any>({});

export const useAppState = () => useContext(AppState);

export const withAppState = (Component: ElementType) => {
  return (props: ComponentProps<ElementType>) => {
    const appState = useAppState();

    return <Component appState={appState} {...props} />;
  };
};

export const AppStateProvider = ({ children }: { children: ReactNode }) => {
  const [appState, setAppState] = useState(initialState);

  const state = { ...appState };

  const setState = (updatedState: Partial<InitialState>) => {
    setAppState((currentState) => ({
      ...currentState,
      ...updatedState,
    }));
  };

  return (
    <AppState.Provider value={{ state, setState }}>
      {children}
    </AppState.Provider>
  );
};
