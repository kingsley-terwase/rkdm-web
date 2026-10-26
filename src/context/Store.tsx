import { createContext, useContext, useState, ReactNode } from 'react'
export interface Gift { cat: string; amount: number; name: string; ref: string; date: string }
const Ctx = createContext<any>(null)
export const useStore = () => useContext(Ctx)
export function StoreProvider({ children }: { children: ReactNode }) {
  const [registered, setReg] = useState<number[]>([1])
  const [owned, setOwned] = useState<number[]>([1])
  const [gifts, setGifts] = useState<Gift[]>([])
  const toggleRegister = (id: number) => setReg(r => (r.includes(id) ? r.filter(x => x !== id) : [...r, id]))
  const value = { registered, toggleRegister, owned, buy: (id: number) => setOwned(o => [...o, id]), gifts, addGift: (g: Gift) => setGifts(x => [g, ...x]) }
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}
