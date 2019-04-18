import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  bed1 = "";
  bed = "";
  decor = "";
  dine = "";
  sale = "";
  sofa = "";
  study = "";
  tv = ""
  ward = ""
  constructor(private storage: AngularFireStorage,private title: Title) {
    const path = "image/StaticImages/";
    this.storage.ref(path + "bed2.jpg").getDownloadURL().subscribe(a => {
      this.bed1 = a
    });
  }

  ngOnInit() {
    const path = "image/StaticImages/";
    this.title.setTitle("Home");


    this.storage.ref(path + "bed.jpg").getDownloadURL().subscribe(a => {
      this.bed = a
    });

    this.storage.ref(path + "decor.jpg").getDownloadURL().subscribe(a => {
      this.decor = a
    });

    this.storage.ref(path + "dine.jpg").getDownloadURL().subscribe(a => {
      this.dine = a
    });

    this.storage.ref(path + "sale.jpg").getDownloadURL().subscribe(a => {
      this.sale = a
    });

    this.storage.ref(path + "sofas.jpg").getDownloadURL().subscribe(a => {
      this.sofa = a
    });

    this.storage.ref(path + "study.jpeg").getDownloadURL().subscribe(a => {
      this.study = a
    });

    this.storage.ref(path + "ward.jpg").getDownloadURL().subscribe(a => {
      this.ward = a
    });

    this.storage.ref(path + "tv.jpg").getDownloadURL().subscribe(a => {
      this.tv = a
    });

  }

}
