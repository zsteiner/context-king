import iconMap from '../assets/iconMap.json';

export default function mapIcon(icon) {
  const iconMapped = iconMap[icon];
  console.log('icon', icon, '->', iconMapped);
  return iconMapped;
}
