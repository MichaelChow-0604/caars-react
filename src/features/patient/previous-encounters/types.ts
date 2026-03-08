export interface EncounterSection {
  label: string;
  content: string;
}

export interface PreviousEncounter {
  id: string;
  date: string;
  sections: EncounterSection[];
}
