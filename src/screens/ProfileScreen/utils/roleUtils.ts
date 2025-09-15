/**
 * Converte o identificador do papel do usuário para um texto legível.
 * @param role A string do papel (ex: 'admin', 'doctor').
 * @returns O texto formatado (ex: 'Administrador').
*/
export const getRoleText = (role: string): string => {
  switch (role) {
    case 'admin':
      return 'Administrador';
    case 'doctor':
      return 'Médico';
    case 'patient':
      return 'Paciente';
    default:
      return role;
  }
};