export const formatDate = (date: Date | null | undefined): string => {
   if (!date) return "Present";
   return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
};