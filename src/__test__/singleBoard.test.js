import React, { useState } from "react";
import { Provider } from "react-redux";
import { render, fireEvent } from "@testing-library/react";

import SingleBoard from "../components/SingleBoard";
import { store } from "../redux";

function Wrapper(ui) {
  return <Provider store={store}>{ui}</Provider>;
}

test("testing add a new card ", () => {
  const { container, getByText, getAllByText } = render(
    Wrapper(<SingleBoard />)
  );
  // let [newListName, setNewListName] = useState("");
  const setReNameBoard = jest.fn();
  const useStateSpy = jest.spyOn(React, "useState");
  useStateSpy.mockImplementation((newListName) => [
    newListName,
    setReNameBoard,
  ]);

  let boardTitle = container.querySelector("h4");
  // console.log(boardTitle);
  fireEvent.click(boardTitle);
  // expect(setReNameBoard).toHaveBeenCalledWith(true);
});
