import { Skill } from './skill.model';

export interface Role {
  roleID: string;
  name: string;
  image: string;
  description: string;
  skills: Skill[];
}