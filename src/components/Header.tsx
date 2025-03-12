import { StatusBar } from "react-native";
import styled from "styled-components/native";

export const HeaderContainer = styled.View`
    background-color: #007BBF;
    padding-top: ${StatusBar.currentHeight}px;
    padding: 20px;
`

export const HeaderTitle = styled.Text`
    color: white;
    font-size: 20px;
    font-weight: bold;
`