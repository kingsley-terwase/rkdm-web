import { stock } from './slides'
export const MONTHS = ['October 2026', 'November 2026', 'December 2026']
const e = (id: number, title: string, desc: string, m: number, day: number, wk: string, time: string, venue: string, reg: number, cap: number, i: number) =>
  ({ id, title, desc, m, day, wk, time, venue, reg, cap, img: stock[i % 5] })
export const calendar = [
  e(5, 'Testimonies & Thanksgiving Service', 'Come with a thankful heart and share what God has done in your life.', 9, 25, 'SUN', '6:30 AM – 12:30 PM WAT', 'Main Auditorium', 1200, 5000, 0),
  e(1, 'Night of Fire Prayer', 'A midnight encounter of fire, intercession and divine visitation.', 9, 30, 'FRI', '9:00 PM – 5:00 AM WAT', 'Main Auditorium', 182, 300, 1),
  e(6, 'Annual Convention: Night of Fire & Glory', 'Seven days of power, healing and the Word with international ministers.', 10, 2, 'MON', '5:00 PM WAT daily', 'Glory Auditorium', 840, 5000, 3),
  e(2, 'Kingdom Leaders Summit', 'Equipping leaders to walk in dominion in business, ministry and society.', 10, 7, 'SAT', '10:00 AM – 4:00 PM WAT', 'Abuja Center', 96, 100, 2),
  e(3, 'Youth Dominion Camp', 'Three days of worship, mentorship and fun for teens and young adults.', 10, 20, 'FRI', '4:00 PM WAT', 'Online', 54, 500, 4),
  e(7, 'Year-End Crossover Service', 'Cross into the new year in the presence of God.', 11, 31, 'THU', '10:00 PM WAT', 'Main Auditorium', 300, 5000, 1),
]
