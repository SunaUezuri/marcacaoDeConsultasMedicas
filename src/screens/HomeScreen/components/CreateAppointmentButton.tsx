import { FontAwesome } from "@expo/vector-icons"
import { Container } from "../styles"
import { Button } from "react-native-elements"
import theme from "../../../styles/theme"

const CreateAppointmentButton: React.FC = () => {
    return(
        <Container>
            <Button
            title="Agendar Nova Consulta"
            icon={
                <FontAwesome
                name="calendar-plus-o"
                size={20}
                color="white"
                style={{ marginRight: 8 }}
                />
            }
            buttonStyle={{
                backgroundColor: theme.colors.primary,
                borderRadius: 8,
                padding: 12,
                marginBottom: theme.spacing.medium
            }}
            onPress={() => navigation.navigate('CreateAppointment')}
            />
        </Container>
    )
};

export default CreateAppointmentButton;