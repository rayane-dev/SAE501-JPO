import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';



@Component({
  selector: 'app-tableau',
  templateUrl: './tableau.component.html',
  styleUrls: ['./tableau.component.css',],
})
export class TableauComponent implements OnInit {
  participants: any[] = [];

    constructor(private http: HttpClient) {}

    ngOnInit() {
        this.loadParticipantsData();
    }

    loadParticipantsData() {
        this.http.get<any[]>('http://localhost/saeapi/participant.php').subscribe(data => {
            this.participants = data;
        });
    }

    downloadExcel() {
        // Convertir les données JSON en feuille de calcul Excel
        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.participants);
        // Créer un classeur Excel
        const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        // Utiliser saveAsExcelFile pour télécharger le fichier
        this.saveAsExcelFile(workbook, 'participants');
    }

    private saveAsExcelFile(workbook: XLSX.WorkBook, fileName: string): void {
        // Écrire le classeur dans un fichier Excel et déclencher le téléchargement
        XLSX.writeFile(workbook, fileName + '.xlsx');
    }
}
