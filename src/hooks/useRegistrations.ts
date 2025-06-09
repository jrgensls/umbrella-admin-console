
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useRegistrations = () => {
  return useQuery({
    queryKey: ['registrations'],
    queryFn: async () => {
      console.log('Fetching registrations from Supabase...');
      const { data, error } = await supabase
        .from('registrations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching registrations:', error);
        throw error;
      }

      console.log('Fetched registrations:', data);
      return data;
    },
  });
};
