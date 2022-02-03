const SET_TAB = 'SET_TAB' as const;

//actions
export const setTab = (id: string) => ({
  type: SET_TAB,
  payload: id,
});

type TabAction = ReturnType<typeof setTab>;

//reducer
type Tabstate = string;

const initialState: Tabstate = '';

export default function tabReducer(state: Tabstate = initialState, action: TabAction) {
  switch (action.type) {
    case SET_TAB:
      return action.payload;
    default:
      return state;
  }
}
