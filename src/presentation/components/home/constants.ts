export const COLORS = {
  primary: '#1E4D8C',
  secondary: '#71A5D9',
  light: '#d0e4fc',
  white: '#ffffff',
  slate700: '#374151',
};

export const CARD_STYLES = {
  base: 'bg-white rounded-2xl border-4 shadow-xl transition',
  border: `border-[${COLORS.secondary}]`,
  hover: 'hover:shadow-2xl transform hover:scale-105',
  flex: 'flex flex-col h-full',
};

export const BUTTON_STYLES = {
  primary: `py-3 px-6 bg-[${COLORS.secondary}] text-white font-bold text-lg rounded-lg hover:bg-[${COLORS.primary}] transition shadow-lg`,
  secondary: `py-4 px-8 bg-white border-2 border-[${COLORS.secondary}] text-[${COLORS.primary}] font-bold text-lg rounded-xl hover:bg-blue-50 shadow-lg transition`,
  solid: `py-4 px-8 bg-[${COLORS.secondary}] text-white font-bold text-lg rounded-xl hover:bg-[${COLORS.primary}] shadow-xl transition transform hover:scale-105`,
};

export const SECTION_PADDING = 'max-w-7xl mx-auto px-6 py-16';
