import React from "react";
import { Link } from "react-router-dom";
import { jsx, css } from "@emotion/core";
import styled from "@emotion/styled";

const QuickAccess = props => {
  const text = props.text;
  const id = props.id;
  const imgLink = props.img;
  const ttl = props.ttl;
  const userNum = props.userNum;
  // const style = css`
  //   height: 20vh;
  //   width: 30%;
  //   background-color: hotpink;
  //   align-content: center;
  //   border-radius: 5px;
  //   box-shadow: 5px 5px 5px 0 rgba(46, 74, 117, 0.5);
  //   text-align: center;
  //   margin: 20px;
  // `
  const Wrapper = styled.div`
    height: 20vh;
    width: 30%;
    background-color: white;
    align-content: center;
    border-radius: 5px;
    box-shadow: 5px 5px 5px 0 rgba(46, 74, 117, 0.5);
    text-align: center;
    margin: 20px;
    `
  return (
    <Wrapper>
      <Link to={`/${id}`}>
        <img src={imgLink} />
      </Link>
      <p>{text}</p>
      {text === "Total Orders" ? <p>{ttl}</p> : null}
      {text === "Total Customers" ? <p>{userNum}</p> : null}
    </Wrapper>
  );
};

export default QuickAccess;
