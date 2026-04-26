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

export async function createProject(project: Omit<Project, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('projects')
    .insert([project])
    .select();

  if (error) {
    console.error('Error creating project:', error);
    throw error;
  }

  return data[0] as Project;
}

export async function deleteProject(id: string) {
  console.log('--- SUPABASE DELETE CALL ---');
  console.log('Target ID:', id);
  
  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('ERROR EN DELETE SUPABASE:', error);
    throw error;
  }
  
  console.log('BORRADO EXITOSO EN DB');
}

export async function updateProject(id: string, updates: Partial<Project>) {
  const { data, error } = await supabase
    .from('projects')
    .update(updates)
    .eq('id', id)
    .select();

  if (error) {
    console.error('Error updating project:', error);
    throw error;
  }

  return data[0] as Project;
}
