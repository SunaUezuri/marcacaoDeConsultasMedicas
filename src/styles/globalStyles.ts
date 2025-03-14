import styled from "styled-components/native";

export const Container = styled.ScrollView`
    flex: 1;
    background-color:rgb(33, 34, 36);
`

export const Content = styled.View`
    padding: 20px;
`

export const Input = styled.TextInput`
  height: 40px;
  border: 1px solid #ced4da;
  border-radius: 5px;
  margin-bottom: 10px;
  padding: 10px;
`;

export const AddButton = styled.TouchableOpacity`
  background-color: #28a745;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 20px;
  align-items: center;
`;

export const ButtonText = styled.Text`
  color: white;
  font-weight: bold;
`;

export const ListItem = styled.View`
  background-color: white;
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 10px;
  elevation: 2;
`;

export const ListItemText = styled.Text`
  font-size: 16px;
`;