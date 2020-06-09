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
