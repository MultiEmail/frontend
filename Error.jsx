import React from 'react'
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const Error = () => {
    return (
    <Wrapper>
        <img className='immag' src="./images/error.svg" alt="error" />
        <NavLink to="/">
        <button className="btn cont-btn">
            Return
        </button>
        </NavLink>
    </Wrapper>
    )
}
const Wrapper = styled.section`
padding : 9rem 0;
display : flex;
justify-content : center;
align-items : center;
flex-direction : column;
.cont-btn{
    max-width : 1.6rem;
  margin-top : 3rem;
  background-color : ${({theme}) => theme.colors.text};
  color : ${({theme}) => theme.colors.white};
  padding : 1.4rem 3.2rem;
  padding-right : 10.1rem;
  border-style : solid;
  border-width : .1rem;
  text-transform : uppercase;
  font-size : 1.8rem;
  cursor : pointer;
  border-radius : 1rem;
}
.immag{
    width : 90vw;
    height : auto;
}`;

export default Error
