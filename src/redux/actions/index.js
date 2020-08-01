function addNewList(listTitle) {
  return { type: "ADD_NEW_LIST", payload: listTitle };
}

function deleteList(listTitle) {
  return { type: "DELETE_LIST", payload: listTitle };
}

function addCard(index, card) {
  return { type: "ADD_CARD", payload: { index, card } };
}

function setBoardNewName(newName) {
  return { type: "RENAME_BOARD", payload: newName };
}

function setListNewName(newName, index) {
  return { type: "RENAME_LIST", payload: { newName, index } };
}

export { addNewList, deleteList, addCard, setBoardNewName, setListNewName };
