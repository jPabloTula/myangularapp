import { Component } from '@angular/core';
import { SupabaseService } from '../../services/supabase.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface Clubes {
  Nombre: string;
  id_Pais: number;
}

export interface Paises {
  id: number;
  Nombre: string;
}

@Component({
  selector: 'app-clubes',
  imports: [CommonModule, FormsModule],
  templateUrl: './clubes.component.html',
  styleUrl: './clubes.component.css'
})
export class ClubesComponent {
  clubes: Clubes[] = [];
  // loading = true;
  paises: Paises[] = [];
  selectedPais: number | null = null;


  constructor(
    private supabaseService: SupabaseService
  ) { }

  async ngOnInit() {
    this.paises = await this.supabaseService.getPaises();
  }

  async onPaisChange() {
    if (this.selectedPais) {
      // this.loading = true;
      this.clubes = await this.supabaseService.getClubesByPais(this.selectedPais);
      // this.loading = false;
    } else {
      this.clubes = [];
    }
  }

}
