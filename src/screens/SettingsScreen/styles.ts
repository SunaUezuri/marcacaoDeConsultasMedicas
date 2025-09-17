import { StyleSheet } from 'react-native';
import theme from '../../styles/theme';

const baseButton = {
  paddingVertical: 12,
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scroll: {
    padding: 20,
    paddingBottom: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: theme.colors.text,
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: theme.colors.text,
  },
  section: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
    color: theme.colors.text,
  },
  card: {
    backgroundColor: theme.colors.white,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: theme.colors.border,
    overflow: 'hidden', // Garante que o ListItem não ultrapasse o borderRadius
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  infoRowLast: {
    borderBottomWidth: 0,
  },
  infoLabel: {
    fontSize: 16,
    color: theme.colors.text,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  buttonContainer: {
    marginBottom: 15,
    width: '100%',
  },
  primaryButton: {
    ...baseButton,
    backgroundColor: theme.colors.primary,
  },
  successButton: {
    ...baseButton,
    backgroundColor: theme.colors.success,
  },
  warningButton: {
    ...baseButton,
    backgroundColor: theme.colors.warning,
  },
  dangerButton: {
    ...baseButton,
    backgroundColor: theme.colors.error,
  },
});