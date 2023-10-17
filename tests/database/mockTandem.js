const data = [
  {
    native: 'spa',
    languages: [
      { language: 'eng', level: 'B2' },
      { language: 'rus', level: 'A1' }
    ],
    role: ['tandem'],
    location: { city: 'Madrid', country: 'Spain' },
    remote: 'true'
  },
  {
    native: 'eng',
    languages: [
      { language: 'eng', level: 'C1' },
      { language: 'deu', level: 'C2' }
    ],
    role: ['tutor'],
    location: { city: 'London', country: 'UK' },
    remote: 'true'
  },
  {
    native: 'fin',
    languages: [
      { language: 'eng', level: 'B1' },
      { language: 'fra', level: 'A2' }
    ],
    role: ['tandem'],
    location: { city: 'Vasa', country: 'FInland' },
    remote: 'false'
  },
  {
    native: 'fin',
    languages: [
      { language: 'eng', level: 'A1' },
      { language: 'deu', level: 'C1' },
      { language: 'rus', level: 'B2' },
      { language: 'fra', level: 'C1' },
      { language: 'spa', level: 'A2' },
      { language: 'isl', level: 'B1' },
      { language: 'swe', level: 'C1' }
    ],
    role: ['tandem'],
    location: { city: 'Stockholm', country: 'Sweden' },
    remote: 'false'
  },
  {
    native: 'swe',
    languages: [
      { language: 'fra', level: 'B2' },
      { language: 'rus', level: 'C1' },
      { language: 'spa', level: 'A1' }
    ],
    role: ['tutor'],
    location: { city: 'Umeå', country: 'Sweden' },
    remote: 'true'
  },
  {
    native: 'lav',
    languages: [
      { language: 'deu', level: 'B1' },
      { language: 'eng', level: 'C2' },
      { language: 'fin', level: 'C1' },
      { language: 'swe', level: 'A2' },
      { language: 'isl', level: 'B1' },
      { language: 'fra', level: 'C1' },
      { language: 'ndl', level: 'A2' },
      { language: 'swe', level: 'B1' }
    ],
    role: 'tandem',
    location: { city: 'Riga', country: 'Latvia' },
    remote: 'false'
  },
  {
    native: 'eng',
    languages: [
      { language: 'ita', level: 'A2' },
      { language: 'rus', level: 'B2' },
      { language: 'fra', level: 'C1' }
    ],
    role: ['tandem'],
    location: { city: 'Cambridge', country: 'UK' },
    remote: 'true'
  },
  {
    native: 'fin',
    languages: [
      { language: 'deu', level: 'A1' },
      { language: 'spa', level: 'B1' },
      { language: 'swe', level: 'C1' },
      { language: 'est', level: 'A2' },
      { language: 'rus', level: 'B1' }
    ],
    role: ['tandem'],
    location: { city: 'Helsinki', country: 'Finland' },
    remote: 'true'
  },
  {
    native: 'swe',
    languages: [
      { language: 'eng', level: 'C1' },
      { language: 'deu', level: 'A2' },
      { language: 'rus', level: 'B1' },
      { language: 'jpn', level: 'C1' },
      { language: 'est', level: 'A2' },
      { language: 'fin', level: 'B1' }
    ],
    role: ['tutor', 'tandem'],
    location: { city: 'Örebro', country: 'Sweden' },
    remote: 'true'
  },
  {
    native: 'jpn',
    languages: [
      { language: 'eng', level: 'C1' },
      { language: 'deu', level: 'A2' },
      { language: 'rus', level: 'B1' },
      { language: 'nor', level: 'C1' },
      { language: 'ndl', level: 'A2' },
      { language: 'slk', level: 'B1' },
      { language: 'est', level: 'C1' },
      { language: 'pol', level: 'A2' },
      { language: 'swe', level: 'B1' }
    ],
    role: ['tutor', 'tandem'],
    location: { city: 'Tokyo', country: 'Japan' },
    remote: 'true'
  },
  {
    native: 'lit',
    languages: [
      { language: 'eng', level: 'C1' },
      { language: 'deu', level: 'A2' },
      { language: 'rus', level: 'B1' },
      { language: 'swe', level: 'C1' },
      { language: 'fin', level: 'A2' },
      { language: 'jpn', level: 'B1' }
    ],
    role: ['tutor', 'tandem'],
    location: { city: 'Villnius', country: 'Lithuania' },
    remote: 'true'
  },
  {
    native: 'eng',
    languages: [
      { language: 'eng', level: 'C1' },
      { language: 'deu', level: 'A2' },
      { language: 'rus', level: 'B1' },
      { language: 'est', level: 'C1' },
      { language: 'srp', level: 'A2' },
      { language: 'slk', level: 'B1' }
    ],
    role: ['tutor'],
    location: { city: 'Seattle', country: 'USA' },
    remote: 'true'
  },
  {
    native: 'est',
    languages: [
      { language: 'eng', level: 'C1' },
      { language: 'deu', level: 'A2' },
      { language: 'rus', level: 'B1' },
      { language: 'swe', level: 'C1' },
      { language: 'fin', level: 'A2' },
      { language: 'pol', level: 'B1' }
    ],
    role: ['tutor'],
    location: { city: 'Talinn', country: 'Estonia' },
    remote: 'true'
  },
  {
    native: 'eng',
    languages: [
      { language: 'spa', level: 'C1' },
      { language: 'deu', level: 'A2' },
      { language: 'ces', level: 'B1' }
    ],
    role: ['tutor'],
    location: { city: 'Houston', country: 'USA' },
    remote: 'true'
  },
  {
    native: 'slk',
    languages: [
      { language: 'eng', level: 'C1' },
      { language: 'deu', level: 'A2' },
      { language: 'rus', level: 'B1' }
    ],
    role: ['tutor', 'tandem'],
    location: { city: 'Bratislava', country: 'Slovakia' },
    remote: 'true'
  },
  {
    native: 'ukr',
    languages: [
      { language: 'eng', level: 'C1' },
      { language: 'deu', level: 'A2' },
      { language: 'rus', level: 'B1' },
      { language: 'nor', level: 'C1' },
      { language: 'bul', level: 'A2' }
    ],
    role: ['tutor', 'tandem'],
    location: { city: 'Kiev', country: 'Ukraine' },
    remote: 'true'
  },
  {
    native: 'ita',
    languages: [
      { language: 'eng', level: 'C1' },
      { language: 'por', level: 'A2' },
      { language: 'spa', level: 'B1' }
    ],
    role: ['tutor'],
    location: { city: 'Milan', country: 'Italy' },
    remote: 'true'
  },
  {
    native: 'swe',
    languages: [
      { language: 'fin', level: 'C1' },
      { language: 'cmn', level: 'A2' },
      { language: 'hin', level: 'B1' }
    ],
    role: ['tutor', 'tandem'],
    location: { city: 'Kumla', country: 'Sweden' },
    remote: 'true'
  },
  {
    native: 'pol',
    languages: [
      { language: 'eng', level: 'C1' },
      { language: 'deu', level: 'A2' },
      { language: 'rus', level: 'B1' }
    ],
    role: ['tutor', 'tandem'],
    location: { city: 'Krakow', country: 'Poland' },
    remote: 'true'
  },
  {
    native: 'dan',
    languages: [
      { language: 'jpn', level: 'C1' },
      { language: 'ndl', level: 'A2' },
      { language: 'rus', level: 'B1' },
      { language: 'eng', level: 'C1' },
      { language: 'deu', level: 'A2' }
    ],
    role: ['tutor'],
    location: { city: 'Copenhagen', country: 'Denmark' },
    remote: 'true'
  }
]

export default data
