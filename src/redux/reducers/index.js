let initialState = {
  boards: [
    {
      name: "Kubric UI",
      lists: [
        { title: "Backlog", cards: ["testing1", "testing2", "testing3"] },
        {
          title: "Prioritized",
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
        boards: state.boards.map((board, i) => {
          if (i === state.nowShowingBoard) {
            return {
              ...board,
              lists: board.lists.concat({ title: action.payload, cards: [] }),
            };
          }
          return board;
        }),
      };
    case "DELETE_LIST":
      return {
        ...state,
        boards: state.boards.map((board, i) => {
          if (i === state.nowShowingBoard) {
            return {
              ...board,
              lists: board.lists.filter(
                (list) => list.title !== action.payload
              ),
            };
          }
          return board;
        }),
      };

    default:
      return state;
  }
}
