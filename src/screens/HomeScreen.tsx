import { useState } from "react"
import { AddButton, ButtonText, Container, Content, Input, ListItem, ListItemText } from "../styles/globalStyles";
import { HeaderContainer, HeaderTitle } from "../components/Header";
import { Alert, Button, FlatList } from "react-native";

const HomeScreen = () => {

    const [text, setText] = useState('');
    const [items, setItems] = useState([
        { id: '1', text: 'Item 1' },
        { id: '2', text: 'Item 2' },
        { id: '3', text: 'Item 3' },
    ])

    const addItem = () => {
        if (text.trim()) {
            setItems([...items, {id: Date.now().toString(), text }]);
            setText('');
        }
    };

    return(
        <Container>
            <HeaderContainer>
                <HeaderTitle>Meu Primeiro App</HeaderTitle>
            </HeaderContainer>

            <Content>
                <Input
                    placeholder = "Digite um item"
                    onChange = {setText}
                    value = {text}
                />

                <AddButton onPress = {addItem}>
                    <ButtonText>Adicionar</ButtonText>
                </AddButton>

                <FlatList
                    data={items}
                    keyExtractor={(item) => item.id}
                    renderItem={({item}) => 
                        <ListItem>
                            <ListItemText>{item.text}</ListItemText>
                        </ListItem>
                    }
                />

                <Button
                    title="Sobre"
                    onPress={() => Alert.alert('Bem-vindo', 'Aplicativo React Native')}
                    color='#6c757d'
                />
            </Content>
        </Container>
        
    )
}