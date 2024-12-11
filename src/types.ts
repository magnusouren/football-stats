export enum CompetitionType {
  LEAGUE = 'LEAGUE',
  LEAGUE_CUP = 'LEAGUE_CUP',
  CUP = 'CUP',
  PLAYOFFS = 'PLAYOFFS',
}

export interface Competition {
  area: Area;
  code: string;
  currentSeason?: Season;
  emblem: string;
  id: number;
  lastUpdated: string;
  name: string;
  seasons?: Season[];
  type: string;
}

export interface Season {
  currentMatchday: number;
  endDate: string;
  id: number;
  startDate: string;
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

export enum ScoreDuration {
  REGULAR = 'REGULAR',
  EXTRA_TIME = 'EXTRA_TIME',
  PENALTY_SHOOTOUT = 'PENALTY_SHOOTOUT',
}

export interface Score {
  duration: ScoreDuration;
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

export enum Stage {
  FINAL = 'FINAL',
  THIRD_PLACE = 'THIRD_PLACE',
  SEMI_FINALS = 'SEMI_FINALS',
  QUARTER_FINALS = 'QUARTER_FINALS',
  LAST_16 = 'LAST_16',
  LAST_32 = 'LAST_32',
  LAST_64 = 'LAST_64',
  ROUND_4 = 'ROUND_4',
  ROUND_3 = 'ROUND_3',
  ROUND_2 = 'ROUND_2',
  ROUND_1 = 'ROUND_1',
  GROUP_STAGE = 'GROUP_STAGE',
  PRELIMINARY_ROUND = 'PRELIMINARY_ROUND',
  QUALIFICATION = 'QUALIFICATION',
  QUALIFICATION_ROUND_1 = 'QUALIFICATION_ROUND_1',
  QUALIFICATION_ROUND_2 = 'QUALIFICATION_ROUND_2',
  QUALIFICATION_ROUND_3 = 'QUALIFICATION_ROUND_3',
  PLAYOFF_ROUND_1 = 'PLAYOFF_ROUND_1',
  PLAYOFF_ROUND_2 = 'PLAYOFF_ROUND_2',
  PLAYOFFS = 'PLAYOFFS',
  REGULAR_SEASON = 'REGULAR_SEASON',
  CLAUSURA = 'CLAUSURA',
  APERTURA = 'APERTURA',
  CHAMPIONSHIP = 'CHAMPIONSHIP',
  RELEGATION = 'RELEGATION',
  RELEGATION_ROUND = 'RELEGATION_ROUND',
}

export enum Group {
  GROUP_A = 'GROUP_A',
  GROUP_B = 'GROUP_B',
  GROUP_C = 'GROUP_C',
  GROUP_D = 'GROUP_D',
  GROUP_E = 'GROUP_E',
  GROUP_F = 'GROUP_F',
  GROUP_G = 'GROUP_G',
  GROUP_H = 'GROUP_H',
  GROUP_I = 'GROUP_I',
  GROUP_J = 'GROUP_J',
  GROUP_K = 'GROUP_K',
  GROUP_L = 'GROUP_L',
  LEAGUE_PHASE = 'League phase',
}

export interface Match {
  id: number;
  area: Area;
  awayTeam: Team;
  homeTeam: Team;
  competition: Competition;
  group?: Group;
  referees: Person[];
  stage: string;
  status: MatchStatus;
  score: Score;
  utcDate: string;
  lastUpdated: string;
}

export interface TableInstance {
  draw: number;
  form?: string;
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

export interface Standing {
  stage: Stage;
  type: string;
  group?: Group;
  table: TableInstance[];
}

export interface DetailedCompetition {
  area: Area;
  competition: Competition;
  season: Season;
  standings: Standing[];
}

export interface Player {
  dateOfBirth: string;
  id: number;
  name: string;
  nationality: string;
  position: string;
}

export interface DetailedTeam {
  address: string;
  area: Area;
  clubColors: string;
  coach: {
    contract: {
      start: string;
      until: string;
    };
    dateOfBirth: string;
    firstName: string;
    id: number;
    lastName: string;
    name: string;
    nationality: string;
  };
  crest: string;
  founded: number;
  id: number;
  lastUpdated: string;
  name: string;
  runningCompetitions: {
    code: string;
    emblem: string;
    id: number;
    name: string;
    type: CompetitionType;
  }[];
  shortName: string;
  squad: Player[];
  staff: Person[];
  tla: string;
  venue: string;
  website: string;
}
