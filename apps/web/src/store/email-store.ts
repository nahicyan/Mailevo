// apps/web/store/email-store.ts
import { create } from 'zustand'
import { Campaign, Contact } from '@/lib/database/models'

interface EmailStore {
  campaigns: Campaign[]
  contacts: Contact[]
  selectedCampaign: Campaign | null
  isLoading: boolean
  
  // Actions
  setCampaigns: (campaigns: Campaign[]) => void
  setContacts: (contacts: Contact[]) => void
  setSelectedCampaign: (campaign: Campaign | null) => void
  setLoading: (loading: boolean) => void
  addCampaign: (campaign: Campaign) => void
  updateCampaign: (id: string, updates: Partial<Campaign>) => void
}

export const useEmailStore = create<EmailStore>((set, get) => ({
  campaigns: [],
  contacts: [],
  selectedCampaign: null,
  isLoading: false,

  setCampaigns: (campaigns) => set({ campaigns }),
  setContacts: (contacts) => set({ contacts }),
  setSelectedCampaign: (campaign) => set({ selectedCampaign: campaign }),
  setLoading: (loading) => set({ isLoading: loading }),
  
  addCampaign: (campaign) => 
    set((state) => ({ campaigns: [...state.campaigns, campaign] })),
  
  updateCampaign: (id, updates) =>
    set((state) => ({
      campaigns: state.campaigns.map((campaign) =>
        campaign._id?.toString() === id ? { ...campaign, ...updates } : campaign
      ),
    })),
}))
