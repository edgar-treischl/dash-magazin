// Type definitions for @dash-magazin/reports

declare module '@dash-magazin/reports' {
  export const EnergyTransition2026: any;
}

declare module '@dash-magazin/reports/energy-transition-2026' {
  const component: any;
  export default component;
}

declare module '@dash-magazin/reports/energy-transition-2026/data' {
  const data: {
    metadata: {
      id: string;
      title: string;
      authors: string[];
      publishDate: string;
      summary: string;
    };
    sections: Array<{
      id: string;
      type: string;
      [key: string]: any;
    }>;
  };
  export default data;
}
