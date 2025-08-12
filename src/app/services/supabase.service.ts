import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';


@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    const supabaseUrl = 'https://lbnpkoksexiegvotizvy.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxibnBrb2tzZXhpZWd2b3RpenZ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI2MDI5MzUsImV4cCI6MjA2ODE3ODkzNX0.42mguRlppnPHVlioo_2PZIsS7UIejrJ5i4rpabqNTv0';
    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  // Obtener todos los países
  async getPaises() {
    const { data, error } = await this.supabase.from('paises').select('*').order('Nombre', { ascending: true });
    if (error) {
      console.error('Error obteniendo Paises:', error);
      return [];
    }
    return data;
  }

  // Obtener clubes por id_pais
  async getClubesByPais(idPais: number) {
    const { data, error } = await this.supabase
      .from('clubes')
      .select('*')
      .eq('id_Pais', idPais)
      .order('Nombre', { ascending: true });
    if (error) throw error;
    return data;
  }
}
