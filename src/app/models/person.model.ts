// POST /auth/login : la preuve, et le prénom pour dire bonjour
export type PersonsCard = {
  id: string;
  first: string;
  last: string;
  date: string;
  age: number;
  email: string;
  city: string;
  state: string;
  country: string;
  phone: string;
  cell: string;
  pictureMedium: string;
};

export type PersonApi = {
  gender: Gender;
  name: PersonName;
  location: PersonLocation;
  email: string;
  login: Login;
  dob: DateInfo;
  registered: DateInfo;
  phone: string;
  cell: string;
  id: PersonId;
  picture: Picture;
  nat: string;
};

export type PeopleResponse = {
    results: PersonApi[];
    info: ApiInfo;  
}

export type Gender = "male" | "female";

export type PersonName = {
  title: string;
  first: string;
  last: string;
};

export type Street = {
  number: number;
  name: string;
};

export type Coordinates = {
  latitude: string;
  longitude: string;
};

export type Timezone = {
  offset: string;
  description: string;
};

export type PersonLocation = {
  street: Street;
  city: string;
  state: string;
  country: string;
  postcode: number | string;
  coordinates: Coordinates;
  timezone: Timezone;
};

export type Login = {
  uuid: string;
  username: string;
  password: string;
  salt: string;
  md5: string;
  sha1: string;
  sha256: string;
};

export type DateInfo = {
  date: string;
  age: number;
};

export type PersonId = {
  name: string;
  value: string;
};

export type Picture = {
  large: string;
  medium: string;
  thumbnail: string;
};

export type ApiInfo = {
  seed: string;
  results: number;
  page: number;
  version: string;
};
