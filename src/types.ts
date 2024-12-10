export interface Competition {
  area: Area;
  code: string;
  currentSeason?: Season;
  emblem: string;
  id: number;
  lastUpdated: Date;
  name: string;
  seasons?: Season[];
  type: string;
}

export interface Season {
  currentMatchday: number;
  endDate: Date;
  id: number;
  startDate: Date;
  winner?: Team;
}

export interface Area {
  code: string;
  name: string;
  flag: string;
  id: number;
}

export interface Team {
  id: number;
  name: string;
  crest: string;
  shortName: string;
  tla: string;
}

export interface Person {
  id: number;
  name: string;
  type: string;
  nationality: string;
}

export interface Goals {
  home: number;
  away: number;
}

export interface Score {
  duration: string;
  fullTime: Goals;
  halfTime: Goals;
  winner: string;
}

export enum MatchStatus {
  SCHEDULED = 'SCHEDULED',
  TIMED = 'TIMED',
  IN_PLAY = 'IN_PLAY',
  PAUSED = 'PAUSED',
  CANCELLED = 'CANCELLED',
  FINISHED = 'FINISHED',
  POSTPONED = 'POSTPONED',
  SUSPENDED = 'SUSPENDED',
  AWARDED = 'AWARDED',
}

export interface Match {
  id: number;
  area: Area;
  awayTeam: Team;
  homeTeam: Team;
  competition: Competition;
  group: string;
  referees: Person[];
  stage: string;
  status: MatchStatus;
  score: Score;
  utcDate: string;
  lastUpdated: string;
}

export interface TableInstance {
  draw: number;
  form: string;
  goalDifference: number;
  goalsAgainst: number;
  goalsFor: number;
  lost: number;
  playedGames: number;
  points: number;
  position: number;
  team: Team;
  won: number;
}
