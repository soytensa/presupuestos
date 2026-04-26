import { supabase } from '../supabase';

export interface Project {
  id: string;
  client_name: string;
  address: string;
  total_amount: number;
  status: string;
  created_at: string;
}

export async function getProjects() {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching projects:', error);
    return [];
  }

  return data as Project[];
}
