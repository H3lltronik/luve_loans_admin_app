interface User {
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  isDraft: boolean;
  isPublished: boolean;
  id: string;
  seqId: number;
  username: string;
  name: string;
  password: string;
  profileId: string;
  profile: Profile;
}

type MeResponse = User;

type GetUsersResponse = {
  data: User[];
  pagination: Pagination;
};

type GetUserResponse = User;
type UpdatedUserResponse = User;
type DeleteUserResponse = User;

interface UserCreatedResponse {
  username: string;
  password: string;
  profile: Profile;
  profileId: string;
  deletedAt?: null;
  createdAt: string;
  updatedAt: string;
  id: string;
}

interface CreateUserRequest {
  isDraft: boolean;
  isPublished: boolean;
  username: string;
  name: string;
  password: string;
  profileId: string;
}

// parsed
type UserWithStatus = User & { status: string };
type UsersWithStatus = UserWithStatus[];
type GetUsersResponseWithStatus = {
  data: UsersWithStatus;
  pagination: Pagination;
};
