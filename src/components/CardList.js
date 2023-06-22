import React from 'react';
import Card from './Card';
import "./Card.css";

const cardsData = [
  {
    id: 1,
    title: 'Card 1',
    image: 'https://placehold.it/400x300',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    linkUrl:'/buchung',
  },
  {
    id: 2,
    title: 'Card 2',
    image: 'https://placehold.it/400x300',
    description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    linkUrl:'/buchung',
  },
  {
    id: 3,
    title:  'Card 3',
    image: 'https://placehold.it/400x300',
    description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    linkUrl:'/buchung',
  },
];

const CardList = () => (
  <div>
    {cardsData.map((card) => (
      <Card
        key={card.id}
        title={card.title}
        image={card.image}
        description={card.description}
        linkUrl={card.linkUrl}
      />
    ))}
  </div>
);

export default CardList;