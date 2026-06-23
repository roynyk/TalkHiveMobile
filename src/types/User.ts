export interface UserType {
  id: number;
  username: string;
  fullName: string;
  email: string;
  photoProfile: string | null;
}

export interface EditProfileModalProps {
  visible: boolean;
  onClose: () => void;
  onSaveSuccess: (updatedData: any) => void;
  currentName: string;
  currentBio: string;
}
