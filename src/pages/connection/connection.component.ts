import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConnectionService } from '../../services/user/connection.service';

@Component({
  selector: 'app-connection',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './connection.component.html',
  styleUrl: './connection.component.css',
})
export class ConnectionComponent implements OnInit {
  connections: any[] = [];
  loading = true;
  error: string | null = null;

  constructor(private connectionService: ConnectionService) {}

  ngOnInit(): void {
    console.log('ConnectionComponent initialized');
    this.connectionService.getConnectionsService().subscribe({
      next: (response: any) => {
        console.log('Raw response:', response);
        if (response && Array.isArray(response) && response.length > 0) {
          this.connections = response[0].data || [];
        } else if (response && Array.isArray(response)) {
          this.connections = response;
        } else if (response && response.data && Array.isArray(response.data)) {
          this.connections = response.data;
        } else {
          this.connections = [];
        }
        this.loading = false;
        console.log('Processed connections:', this.connections);
      },
      error: (error: any) => {
        console.error('Error fetching connections:', error);
        this.error = 'Failed to load connections. Please try again.';
        this.loading = false;
        this.connections = [];
      },
    });
  }
}
