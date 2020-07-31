import React, { useState, useRef } from "react";
import { MdDelete, MdAdd } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { connect } from "react-redux";
import { addNewList } from "../redux/actions";

const SingleBoard = (props) => {
  let [showInputForNewListTitle, setShowInputForNewListTitle] = useState(false);
  let data = useRef("");

  const handleShowInputBox = () => {
    setShowInputForNewListTitle(!showInputForNewListTitle);
  };

  const updateData = (e) => {
    data = e.target.value;
  };

  const handleAddNewList = () => {
    props.dispatch(addNewList(data));
    setShowInputForNewListTitle(false);
    data = "";
  };

  let { nowShowingBoard } = props;
  return (
    <section className="single_board_section">
      <h4 className="signle_board_title"> {nowShowingBoard.name}</h4>
      <div className="all_list">
        {nowShowingBoard.lists.map((list) => {
          return (
            <div className="single_list">
              <div className="header_section">
                <h5 className="list_title">{list.name}</h5>
                <div>
                  <MdDelete className="delete_icon" />
                </div>
              </div>
              {list.cards.map((card) => {
                console.log(card, "cards");
                return <div className="single_card">{card}</div>;
              })}

              <div className="add_single_card">
                {" "}
                <MdAdd /> Add another card
              </div>
            </div>
          );
        })}
        <div
          className={
            showInputForNewListTitle ? "single_list" : "add_single_list"
          }>
          {showInputForNewListTitle ? (
            <div className="add_new_list_section">
              <input
                className="new_list_title"
                placeholder="Enter new title..."
                type="text"
                ref={data}
                onChange={updateData}
              />
              <button className="btn_new_title" onClick={handleAddNewList}>
                Add List
              </button>
              <span className="close_icon">
                <IoMdClose onClick={handleShowInputBox} />
              </span>
            </div>
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
  // console.log(state.nowShowingBoard, "nowShowingBoard");
  return {
    nowShowingBoard: state.boards[state.nowShowingBoard],
  };
}
export default connect(mapStateToProps)(SingleBoard);
