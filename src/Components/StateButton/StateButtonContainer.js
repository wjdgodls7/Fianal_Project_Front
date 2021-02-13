import React, { useState } from "react";
import PropTypes from "prop-types";
import { useMutation } from "react-apollo-hooks";
import StateButtonPresenter from "./StateButtonPresenter";
import { SET_STATE } from "./StateButtonQueries";

const StateButtonContainer = () => {
    const [state, setState] = useState("1");
    const [stateMutation] = useMutation(SET_STATE, {
        variables: {
            state
        }
    })

    const onClick = () => {
        if (state === "1") {
            setState("2");
            stateMutation();
        } else {
            setState("1");
            stateMutation();
        }
    }
    return <StateButtonPresenter onClick={onClick} state={state} />
};

StateButtonContainer.propTypes = {
    state: PropTypes.string,
}
export default StateButtonContainer;