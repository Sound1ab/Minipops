/* eslint-disable */

export default function mapMarkerGoogleNormal (selected, letter) {
	return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" baseProfile="full" width="${selected ? '60' : '40'}" height="${selected ? '60' : '40'}" viewBox="0 0 24.00 24.00" enable-background="new 0 0 24.00 24.00" xml:space="preserve"><path class="${selected ? 'google-map__selected-marker' : 'google-map__not-selected-marker'}" fill-opacity="1" stroke-width="0.2" stroke-linejoin="round" d="M8.36,16.89c1.57,2.45,3.16,4.47,3.18,4.49L12,22l.46-.58s1.61-2,3.18-4.49c2.15-3.35,3.24-5.89,3.24-7.55A7.11,7.11,0,0,0,12,2,7.11,7.11,0,0,0,5.12,9.35C5.13,11,6.21,13.54,8.36,16.89Z"/><text x="50%" y="50%" text-anchor="middle" style="color:#ffffff;fill:#ffffff;font-size: ${selected ? '7px' : '6px'};">${letter}</text></svg>`
}
