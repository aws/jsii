import main from '../lib';

main()
  .then(() => {
    console.log('Success!');
    process.exit(0);
  })
  .catch(err => {
    console.error(err.message);
    process.exit(100);
  });
