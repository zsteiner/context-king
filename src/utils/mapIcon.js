import iconMap from '../assets/iconMap.json';

export default function mapIcon(icon) {
  const iconMapped = iconMap[icon];
  return iconMapped;
}
