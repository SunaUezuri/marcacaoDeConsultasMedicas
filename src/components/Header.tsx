import { StatusBar } from "react-native";
import styled from "styled-components/native";

export const HeaderContainer = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 15px;
    background-color: #121212; /* Fundo escuro para um tema gamer */
    border-bottom-width: 2px;
    border-bottom-color: #00ff7f; /* Linha neon */    padding-top: ${StatusBar.currentHeight}px;
    padding: 20px;`

export const HeaderTitle = styled.Text`
    color: #06a02d;
    font-size: 20px;
    font-weight: bold;
`