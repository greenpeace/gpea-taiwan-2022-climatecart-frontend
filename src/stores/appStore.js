import create from "zustand";

const useAppStore = create((set) => ({
    showTicketForm: false,
    donateNodification: true,
    ticketsGot: false,
    needTutorial: true,
    selectedBubbles: [],
    formData: {},
    shoppingRecordKey: null,
    resultImageDataURL: null,
    resultImageData: null,

    setShowTicketForm: show => {
        set({ showTicketForm: show })
    },
    
    clearDonateNodification: () => {
        set({ donateNodification: false })
    },

    setTicketsGot: () => {
        set({ ticketsGot: true })
    },

    clearTicketsGot: () => {
        set({ ticketsGot: false })
    },

    setSelectedBubbles: value => {
        set({ selectedBubbles: value })
    },

    setFormData: value => {
        set({ formData: value })
    },

    setShoppingRecordKey: value => {
        set({ shoppingRecordKey: value })
    },

    setRsultImageDataURL: value => {
        set({ resultImageDataURL: value })
    },

    setRsultImageData: value => {
        set({ resultImageData: value })
    },

    setNeedTutorial: value => {
        set({ needTutorial: value })
    }
}));

export { useAppStore };
