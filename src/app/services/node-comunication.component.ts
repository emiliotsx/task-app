import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-node-communication',
  templateUrl: './node-communication.component.html',
  styleUrls: []
})
export class NodeCommunicationComponent implements OnInit {
  responseFromServer: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get('/api/data').subscribe((data) => {
      this.responseFromServer = data;
    });
  }
}
