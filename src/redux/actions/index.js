function addNewList(listTitle) {
  return { type: "ADD_NEW_LIST", payload: listTitle };
}

function deleteList(listTitle) {
  return { type: "DELETE_LIST", payload: listTitle };
}
export { addNewList, deleteList };
