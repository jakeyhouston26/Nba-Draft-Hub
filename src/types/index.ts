export type Player = {
  bio: {
    playerId: number;
    name: string;
    photoUrl?: string;
    currentTeam: string;
    league: string;
    position?: string;
  };
  ranking?: Record<string, number>;
  stats?: {
    perGame?: Record<string, number>;
    seasonTotals?: Record<string, number>;
  };
  measurement?: Record<string, number | null>;
  reports?: {
    name: string;
    text: string;
    grade: number;
    interest: 'High' | 'Medium' | 'Low';
    type: 'Need' | 'Want' | 'BPA';
  }[];
  

  interest?: 'GREEN' | 'YELLOW' | 'RED';
  draftType?: 'BPA' | 'NEED' | 'WANT';
  scoutGrade?: number;
  international?: boolean;
};
