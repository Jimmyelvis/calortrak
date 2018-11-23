export const team1 = {
  nickname: 'Warriors',
  city: 'Gulf City'
}

export const team2 = {
  nickname: 'Cubs',
  city: 'North Carolina'
}

export const team3 = {
  nickname: 'Outlaws',
  city: 'Las Vegas'
}

export function favTeam() {
  return `My fav team is ${team2.city}  ${team2.nickname}`;
}