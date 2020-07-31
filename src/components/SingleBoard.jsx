import React from "react";
import { MdDelete, MdAdd } from "react-icons/md";

const SingleBoard = (props) => {
  return (
    <section className="single_board_section">
      <h4 className="signle_board_title"> Kubric UI</h4>
      <div className="single_list">
        <div className="header_section">
          <h5 className="list_title">Backlog</h5>
          <div className="delete_icon">
            <MdDelete />
          </div>
        </div>
        <div className="single_card"> testing single card</div>
        <div className="single_card"> testing single card</div>
        <div className="add_single_card">
          {" "}
          <MdAdd className="plus_icon" /> Add another card
        </div>
      </div>
    </section>
  );
};

export default SingleBoard;
