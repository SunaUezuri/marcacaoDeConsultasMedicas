import { useState } from "react"
import { AddButton, ButtonText, Container, Content, Input, ListItem, ListItemText } from "../styles/globalStyles";
import { HeaderContainer, HeaderImage, HeaderTitle } from "../components/Header";
import { Alert, Button, FlatList, Image } from "react-native";

const HomeScreen = () => {
    const [text, setText] = useState('');
    const [items, setItems] = useState([
      { id: '1', text: 'Cadeira Gamer' },
      { id: '2', text: 'Xbox Series X' },
      { id: '3', text: 'RTX 4090' },
    ]);
  
    const addItem = () => {
      if (text.trim()) {
        setItems([...items, { id: Date.now().toString(), text }]);
        setText('');
      }
    };
  
    return (
      
        <Container>
          <HeaderContainer>
            <HeaderTitle>Go On - Live for Games</HeaderTitle>
          </HeaderContainer>
    
          <Content>
            <Input
              placeholder="Digite um item"
              onChangeText={setText}
              value={text}
            />
    
            <AddButton onPress={addItem}>
              <ButtonText>Adicionar</ButtonText>
            </AddButton>
    
            <FlatList
              data={items}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <ListItem>
                  <ListItemText>{item.text}</ListItemText>
                </ListItem>
              )}
            />
    
            <Button
              title="Sobre"
              onPress={() => Alert.alert('Bem-vindo', 'Aplicativo React Native')}
              color="#6c757d"
            />
          </Content>
        </Container>
      

    );
  };

export default HomeScreen;