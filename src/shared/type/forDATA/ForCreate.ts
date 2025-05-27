export type NameInputProps = {
  name: string;
  setName: (name: string) => void;
};

export type DescriptionInputProps = {
  description: string;
  setDescription: (description: string) => void;
};

export type MaxCapacityInputProps = {
  maxCapacity: number;
  setMaxCapacity: (maxCapcity: number) => void;
};

export type ProfileImageUrlInputProps = {
  profileImageUrl: string;
  setProfileImageUrl: (profileImageUrl: string) => void;
  setImageFile: (imageFile: File) => void;
};
