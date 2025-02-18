export interface ValorantAgent {
  uuid: string;
  displayName: string;
  description: string;
  developerName: string;
  releaseDate: string;
  characterTags: string[] | null;
  displayIcon: string;
  displayIconSmall: string;
  bustPortrait: string;
  fullPortrait: string;
  fullPortraitV2: string;
  killfeedPortrait: string;
  background: string;
  backgroundGradientColors: string[];
  assetPath: string;
  isFullPortraitRightFacing: boolean;
  isPlayableCharacter: boolean;
  isAvailableForTest: boolean;
  isBaseContent: boolean;
  role: {
    uuid: string;
    displayName: string;
    description: string;
    displayIcon: string;
    assetPath: string;
  } | null;
  recruitmentData: any | null;
  abilities: ValorantAgentAbility[];
  voiceLine: any | null;
};

export interface ValorantAgentAbility {
  slot: string;
  displayName: string;
  description: string;
  displayIcon: string;
}

export interface ValorantRole {
  uuid: string;
    displayName: string;
    description: string;
    displayIcon: string;
    assetPath: string;
}