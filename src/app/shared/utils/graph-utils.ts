import { PointStyle } from 'chart.js';

export function getPointStyle(cName: string): PointStyle {
  const n = cName.toLowerCase();
  let res: PointStyle = "circle";
  if (n.includes("praxis")) {
    res = "rectRounded";
  } else if (n.includes("amazon")) {
    res = "rect";
  } else if (n.includes("general") || n.includes("dynamics")) {
    res = "rectRot";
  } else if (n.includes("omnyon")) {
    res = "triangle";
  }
  return res;
}

export function getCategoryColor(category: string): string {
  let color: string = "#bfbfbf";
  switch(category) {
    case "salary": {
      color = "#009933";
      break;
    }
    case "Four1kContribution": {
      color = "#006699";
      break;
    }
    case "bonus": {
      color = "#884dff";
      break;
    }
    case "cashablePTOInHours": {
      color = "#ff6600";
      break;
    }
  }
  return color;
}

export class CompanyDuration {
  constructor(public name: string, public dur: number) {

  }
}
