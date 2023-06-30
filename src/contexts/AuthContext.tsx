import { createContext, ReactNode, useEffect, useState } from "react";
import { Api } from "@/services/api";

const api = Api();

type AuthContextData = {
  getCharacters: (
    credentials: getCharactersProps
  ) => Promise<getCharactersProps[]>;
};



export const AuthContext = createContext({} as AuthContextData);


type AuthProviderProps = {
  children: ReactNode;
};
type getCharactersProps = {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: OriginProps;
  location: LocationProps;
  image: string;
};

type LocationProps= {
    name: string;
    url: string;
}
type OriginProps = {
  name: string;
  url: string;
};

async function getCharacters(
  credentials: getCharactersProps
): Promise<getCharactersProps[]> {
  try {
    const response = await api.get("/character", {
      params: credentials,
    });
    const characters: getCharactersProps[] = response.data.results;
    return characters;
  } catch (err) {
    console.error(err);
    throw err;
  }
}


export function AuthProvider({ children }: AuthProviderProps) {
  return (
    <AuthContext.Provider
      value={{
        getCharacters,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
