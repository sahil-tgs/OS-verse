import { create } from 'zustand'

type BootStage = 'systemd' | 'os-select' | 'booting' | 'login' | 'desktop'

interface OSState {
  currentOS: string | null
  bootStage: BootStage
  isBooting: boolean
  actions: {
    setCurrentOS: (os: string) => void
    setBootStage: (stage: BootStage) => void
    setBooting: (status: boolean) => void
  }
}

export const useOSStore = create<OSState>((set) => ({
  currentOS: null,
  bootStage: 'systemd',
  isBooting: false,
  actions: {
    setCurrentOS: (os) => set({ currentOS: os }),
    setBootStage: (stage) => set({ bootStage: stage }),
    setBooting: (status) => set({ isBooting: status }),
  },
}))