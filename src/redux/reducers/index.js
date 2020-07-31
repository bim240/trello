let initialState = {
  boards: [
    {
      name: " Kubric UI",
      lists: [
        { name: "Backlog", cards: ["testing1", "testing2", "testing3"] },
        {
          name: "Prioritized",
          cards: ["testing1", "testing2", "testing3", "testing3", "testing4"],
        },
      ],
    },
  ],
  nowShowingBoard: 0,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_NEW_LIST":
      return {
        ...state,
        ...state.boards[state.nowShowingBoard],
        lists: state.boards[state.nowShowingBoard].lists.push({
          name: action.payload,
          cards: [],
        }),
      };

    default:
      return state;
  }
}
