function addNewList(listTitle) {
  return { type: "ADD_NEW_LIST", payload: listTitle };
}

function deleteList(listTitle) {
  return { type: "DELETE_LIST", payload: listTitle };
}

function addCard(index, card) {
  return { type: "ADD_CARD", payload: { index, card } };
}
export { addNewList, deleteList, addCard };
