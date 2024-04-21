export interface Resume {
    personalInfo: {
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
    };
    education: {
      institution: string;
      degree: string;
      year: number;
    }[];
    experience: {
      company: string;
      position: string;
      year: string;
    }[];
    skills: string[];
  }
  