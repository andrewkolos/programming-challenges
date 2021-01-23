import { Tween, Easings } from '@akolos/ts-tween';

const time = new Date().getTime();
Tween.get(0).to(1).with({easing: Easings.linear, length: 2000})
.on('updated', ({value}) => console.log('1', value))
.on('completed', () => {
  console.log('1', new Date().getTime() - time);
});

Tween.get(0).to(1).with({ easing: Easings.linear, length: 2000 })
  .on('updated', ({ value }) => console.log('2', value))
  .on('completed', () => {
    console.log('2', new Date().getTime() - time);
  });

Tween.get(0).to(1).with({ easing: Easings.linear, length: 2000 })
  .on('updated', ({ value }) => console.log('3', value))
  .on('completed', () => {
    console.log('3', new Date().getTime() - time);
  });

Tween.get(0).to(1).with({ easing: Easings.linear, length: 2000 })
  .on('updated', ({ value }) => console.log('4', value))
  .on('completed', () => {
    console.log('4', new Date().getTime() - time);
  });
