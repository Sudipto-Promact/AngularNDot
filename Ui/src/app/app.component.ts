import { Component, OnInit } from '@angular/core';
import { Card } from './models/card.model';
import { CardsService } from './service/cards.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Cards';
  cards: Card[] = [];
  card: Card = {
    id: '',
    cardHolderName: '',
    cardNumber: '',
    cvc: '', expiryMonth: '',
    expiryYear: ''
  }
  constructor(private cardsService: CardsService) {
  }

  ngOnInit(): void {
    this.getAllCards();
  }
  getAllCards() {
    this.cardsService.getAllCard().subscribe(
      response => {
        this.cards = response;
      }
    );
  }
  onSubmit() {
    if(this.card.id ===''){
      this.cardsService.addCard(this.card)
    .subscribe(
      response=> {
        this.getAllCards();
        this.card = {
          id: '',
          cardHolderName: '',
          cardNumber: '',
          cvc: '', expiryMonth: '',
          expiryYear: ''
        }
      }
    )
    }else{
      this.updateCard(this.card);
    }
  }
  deleteCard(id:string){
    this.cardsService.deleteCard(id).subscribe(response =>{
      this.getAllCards();
    })
  }
  populateForm(card :Card){
    this.card= card;
  }
  updateCard(card :Card){
    console.log(card);
    this.cardsService.updateCard(card).subscribe(response=>{
      this.getAllCards();
      this.card = {
        id: '',
        cardHolderName: '',
        cardNumber: '',
        cvc: '', expiryMonth: '',
        expiryYear: ''
      }
    })
  }
  clear(){
    this.card = {
      id: '',
      cardHolderName: '',
      cardNumber: '',
      cvc: '', expiryMonth: '',
      expiryYear: ''
    }
  }
}
