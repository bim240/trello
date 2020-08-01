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
    case "ADD_CARD":
      return {
        ...state,
        boards: state.boards.map((board, i) => {
          if (i === state.nowShowingBoard) {
            return {
              ...board,
              lists: board.lists.filter((list, i2) => {
                if (i2 === action.payload.index) {
                  return {
                    ...list,
                    cards: list.cards.push(action.payload.card),
                  };
                }
                return list;
              }),
            };
          }
          return board;
        }),
      };
    case "RENAME_BOARD":
      return {
        ...state,
        boards: state.boards.map((board, i) => {
          if (i === state.nowShowingBoard) {
            return {
              ...board,
              name: action.payload,
            };
          }
          return board;
        }),
      };
    case "RENAME_LIST":
      return {
        ...state,
        boards: state.boards.map((board, i) => {
          if (i === state.nowShowingBoard) {
            return {
              ...board,
              lists: board.lists.map((list, i) => {
                if (i === action.payload.index) {
                  return { ...list, title: action.payload.newName };
                }
                return list;
              }),
            };
          }
          return board;
        }),
      };

    default:
      return state;
  }
}
