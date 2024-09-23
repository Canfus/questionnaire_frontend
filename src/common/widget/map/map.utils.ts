import { Icon } from 'leaflet';

const getMarkerIcon = (color?: string) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(`
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M3 16.3917C3 19.6428 6.61978 22.4813 12 24C17.3802 22.4813 21 19.6428 21 16.3917C21 13.9662 16.9706 12 12 12C7.02943 12 3 13.9662 3 16.3917ZM12 19C14.7614 19 17 17.8807 17 16.5C17 15.1193 14.7614 14 12 14C9.23858 14 7 15.1193 7 16.5C7 17.8807 9.23858 19 12 19Z"
      fill="black"
      fill-opacity="0.2"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M3 8.78335C3 15.2855 6.61978 20.9626 12 24C17.3802 20.9626 21 15.2855 21 8.78335C21 3.93244 16.9706 0 12 0C7.02943 0 3 3.93244 3 8.78335ZM12 14C14.7614 14 17 11.7614 17 9C17 6.23858 14.7614 4 12 4C9.23858 4 7 6.23858 7 9C7 11.7614 9.23858 14 12 14Z"
      fill="${color || '#ff0000'}"
    />
  </svg>
  `)}`;

export const getMarkerInstance = (color?: string) => {
  const icon: string = getMarkerIcon(color);

  return new Icon({
    iconUrl: icon,
    iconRetinaUrl: icon,
    iconAnchor: [12, 24],
    popupAnchor: [0, -12],
    tooltipAnchor: [0, -12],
  });
};
