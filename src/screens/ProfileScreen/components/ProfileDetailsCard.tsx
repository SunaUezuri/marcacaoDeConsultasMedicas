import React from 'react';
import ProfileImagePicker from '../../../components/ProfileImagePicker';
import {
  ProfileCard,
  Name,
  Email,
  RoleBadge,
  RoleText,
  SpecialtyText,
} from '../styles';
import { ProfileDetailsCardProps } from '../types/types';
import { getRoleText } from '../utils/roleUtils';

const ProfileDetailsCard: React.FC<ProfileDetailsCardProps> = ({ user }) => {
  if (!user) {
    return null;
  }

  return (
    <ProfileCard>
      <ProfileImagePicker
        currentImageUri={user.image}
        onImageSelected={() => {}}
        size={120}
        editable={false}
      />
      <Name>{user.name}</Name>
      <Email>{user.email}</Email>
      <RoleBadge role={user.role || ''}>
        <RoleText>{getRoleText(user.role || '')}</RoleText>
      </RoleBadge>
      
      {user.role === 'doctor' && user.specialty && (
        <SpecialtyText>Especialidade: {user.specialty}</SpecialtyText>
      )}
    </ProfileCard>
  );
};

export default ProfileDetailsCard;