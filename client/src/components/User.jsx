import React from 'react';
import Styled from 'styled-components';

const Div = Styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    margin: 10px auto;
    border: 1px solid red;
    height: auto;
    width: 33%;
`

export const User = (props) => {
    return (
        <Div>
            <p>Name: {props.user.name}</p>
            <p>Posts: {props.post}</p>
            <button onClick={() => props.getPosts(props.user.id)}>Get Posts</button>
            <button onClick={() => props.deleteUser(props.user.id)}>Delete</button>
        </Div>
    )
}