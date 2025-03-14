import { StatusBar } from "react-native";
import styled from "styled-components/native";

export const HeaderContainer = styled.View`
    background-color: #171a1b;
    padding-top: ${StatusBar.currentHeight}px;
    padding: 20px;
`

export const HeaderTitle = styled.Text`
    color: #06a02d;
    font-size: 20px;
    font-weight: bold;
`