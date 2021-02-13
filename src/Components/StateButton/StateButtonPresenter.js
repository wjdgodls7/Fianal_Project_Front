import React from "react";
import Button from "../Button";

export default ({ state, onClick }) => (
    <Button text={state === "1" ? "전체공개" : "친구만공개"} onClick={onClick} />
);