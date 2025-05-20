export interface PlayerBio {
    playerId: number;
    name: string;
    firstName: string;
    lastName: string;
    birthDate: string;
    height: number;
    weight: number;
    currentTeam: string;
    league: string;
    photoUrl?: string | null;
    homeTown: string;
    homeCountry: string;
    nationality: string;
  }
  
  export interface ScoutRanking {
    playerId: number;
    [scoutName: string]: number | null;
  }
  
  export interface Measurement {
    playerId: number;
    heightNoShoes?: number | null;
    wingspan?: number | null;
    maxVertical?: number | null;
    weight?: number | null;
    agility?: number | null;
    sprint?: number | null;
  }
  
  export type Player = {
    bio: PlayerBio;
    ranking: ScoutRanking | null;
    measurement: Measurement | null;
    stats?: {
      perGame: Record<string, number>;
      seasonTotals: Record<string, number>;
    };
  };
  