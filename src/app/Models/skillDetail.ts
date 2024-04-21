export interface SkillDetail {
    skillID: string;
    name: string;
    image: string;
    description: string;
    youtube: string[];
    website: string[];
    courses: string[];
    roles: Role[];
  }
  
  export interface Role {
    roleID: string;
    name: string;
    image: string;
  }
  