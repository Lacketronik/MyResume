export const formatDate = (date: Date | string | number | null | undefined): string => {
   if (date === null || date === undefined || date === '') return 'Present';

   let d: Date;
   if (typeof date === 'string' || typeof date === 'number') {
      d = new Date(date);
   } else {
      d = date;
   }

   if (!d || Number.isNaN(d.getTime())) return 'Present';

   return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
};