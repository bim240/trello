import React, { useState, useRef } from "react";
import { MdDelete, MdAdd } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { connect } from "react-redux";
import { v4 as uuid } from "uuid";

import {
  addNewList,
  deleteList,
  addCard,
  setBoardNewName,
  setListNewName,
} from "../redux/actions";

const SingleBoard = (props) => {
  let [showInputForNewListTitle, setShowInputForNewListTitle] = useState(false);
  let [showInputForNewCard, setShowInputForNewCard] = useState(false);
  let [reNameBoard, setReNameBoard] = useState(false);
  let [newBoardName, setNewBoardName] = useState(props.nowShowingBoard.name);
  let data = useRef("");
  let [showInputForReNameOfList, setShowInputForReNameOfList] = useState("");
  let [newListName, setNewListName] = useState("");

  const handleReName = (e) => {
    // diaptch for renaming board name
    if (
      newBoardName &&
      reNameBoard &&
      e.target.className !== "single_board_title" &&
      e.target.tagName !== "INPUT" &&
      e.type === "click"
    ) {
      props.dispatch(setBoardNewName(newBoardName));
      setReNameBoard(false);
    } else if (newBoardName && e.keyCode === 13 && reNameBoard) {
      props.dispatch(setBoardNewName(newBoardName));
      setReNameBoard(false);
    }
    // dispatch for remaning list

    if (
      newListName &&
      showInputForReNameOfList &&
      e.target.className !== "input_box_for_renaming_list_titile" &&
      e.target.className !== "list_title" &&
      e.target.tagName !== "INPUT" &&
      e.type === "click"
    ) {
      props.dispatch(setListNewName(newListName, showInputForReNameOfList - 1));
      newListName = "";
      showInputForReNameOfList = false;
      setShowInputForReNameOfList(false);
      setNewListName("");
    } else if (newBoardName && e.keyCode === 13 && showInputForReNameOfList) {
      props.dispatch(setListNewName(newListName, showInputForReNameOfList - 1));
      setShowInputForReNameOfList(false);
      setNewListName("");
    }
  };

  document.addEventListener("click", handleReName);
  document.addEventListener("keypress", handleReName);
  // show input for adding cards and adding list
  const showInput = (index) => {
    return (
      <div className="add_new_list_section">
        {showInputForNewListTitle ? (
          <input
            className="new_list_title"
            placeholder={`Enter new title...`}
            type="text"
            ref={data}
            onChange={updateData}
          />
        ) : (
          <textarea
            ref={data}
            onChange={updateData}
            placeholder="Enter a title for this card..."
            className="new_card_name"></textarea>
        )}

        <button
          className="btn_new_title"
          onClick={() =>
            showInputForNewCard ? hanldeAddNewCard(index) : handleAddNewList()
          }>
          Add {showInputForNewCard ? "Card" : "Title"}
        </button>
        <span className="close_icon">
          <IoMdClose
            onClick={() => {
              setShowInputForNewCard(false);
              setShowInputForNewListTitle(false);
            }}
          />
        </span>
      </div>
    );
  };
  const handleShowInputBox = () => {
    setShowInputForNewListTitle(!showInputForNewListTitle);
  };

  const updateData = (e) => {
    data.current = e.target.value;
  };

  const handleAddNewList = () => {
    props.dispatch(addNewList(data.current));
    setShowInputForNewListTitle(false);
    data.current = "";
  };
  const hanldeAddNewCard = (index) => {
    props.dispatch(addCard(index, data.current));
    setShowInputForNewCard(false);
    data.current = "";
  };

  const handleDeletingList = (listTitle) => {
    props.dispatch(deleteList(listTitle));
  };

  let { nowShowingBoard } = props;
  return (
    <section className="single_board_section">
      <h4 className="single_board_title" onClick={() => setReNameBoard(true)}>
        {reNameBoard ? (
          <input
            className="new_board_name"
            type="text"
            value={newBoardName}
            onChange={(e) => setNewBoardName(e.target.value)}
          />
        ) : (
          nowShowingBoard.name
        )}{" "}
      </h4>
      <div className="all_list">
        {nowShowingBoard.lists.map((list, index) => {
          return (
            <div className="single_list" key={uuid()}>
              <div className="header_section">
                {showInputForReNameOfList &&
                showInputForReNameOfList - 1 === index ? (
                  <input
                    className="input_box_for_renaming_list_titile"
                    type="text"
                    value={newListName}
                    onChange={(e) => setNewListName(e.target.value)}
                  />
                ) : (
                  <h5
                    className="list_title"
                    onClick={() => {
                      setShowInputForReNameOfList(index + 1);
                      setNewListName(list.title);
                    }}>
                    {list.title}
                  </h5>
                )}
                <div onClick={() => handleDeletingList(list.title)}>
                  <MdDelete className="delete_icon" />
                </div>
              </div>
              {list.cards.map((card) => {
                return (
                  <div className="single_card" key={uuid()}>
                    {card}
                  </div>
                );
              })}
              {showInputForNewCard && showInputForNewCard - 1 === index ? (
                showInput(index)
              ) : (
                <div
                  className="add_single_card"
                  onClick={() => setShowInputForNewCard(index + 1)}>
                  {" "}
                  <MdAdd /> Add another card
                </div>
              )}
            </div>
          );
        })}
        <div
          className={
            showInputForNewListTitle ? "single_list" : "add_single_list"
          }>
          {showInputForNewListTitle ? (
            showInput()
          ) : (
            <div className="add_single_card" onClick={handleShowInputBox}>
              {" "}
              <MdAdd /> Add another list
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

function mapStateToProps(state) {
  localStorage.setItem("state", JSON.stringify(state));
  return {
    nowShowingBoard: state.boards[state.nowShowingBoard],
  };
}
export default connect(mapStateToProps)(SingleBoard);
