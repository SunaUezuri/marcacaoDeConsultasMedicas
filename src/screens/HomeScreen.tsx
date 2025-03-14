import { useState } from "react";
import { AddButton, ButtonText, Container, Content, Input, ListItem, ListItemText } from "../styles/globalStyles";
import { HeaderContainer, HeaderTitle } from "../components/Header";
import { Alert, Button, FlatList, Image, TouchableOpacity, Switch } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const HomeScreen = () => {
  const [text, setText] = useState("");
  const [items, setItems] = useState([
    { id: "1", text: "Cadeira Gamer" },
    { id: "2", text: "Mouse RGB" },
    { id: "3", text: "Headset HyperX" },
  ]);
  const [themeDark, setThemeDark] = useState(false);

  const addItem = () => {
    if (text.trim()) {
      const newItem = { id: Date.now().toString(), text };
      setItems([...items, newItem]);
      setText("");
    }
  };


  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <Container style={{ backgroundColor: themeDark ? "#121212" : "#FFFFFF" }}>
      <HeaderContainer>
        <Image
          source={require("../../assets/favicon.png")}
          style={{ width: 30, height: 30, marginRight: 10 }}
        />
        <HeaderTitle>Go On - Live Game</HeaderTitle>
      </HeaderContainer>

      <Content>
        <Switch
          value={themeDark}
          onValueChange={() => setThemeDark(!themeDark)}
          style={{ marginBottom: 20 }}
        />
        <Input
          placeholder="Adicionar item..."
          value={text}
          onChangeText={setText}
        />

        <AddButton onPress={addItem}>
          <ButtonText>Adicionar</ButtonText>
        </AddButton>

        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ListItem style={{ backgroundColor: themeDark ? "#333" : "#ddd" }}>
              <TouchableOpacity>
                <ListItemText>
                  {item.text}
                </ListItemText>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => removeItem(item.id)}>
                <MaterialIcons name="delete" size={20} color="red" />
              </TouchableOpacity>
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
