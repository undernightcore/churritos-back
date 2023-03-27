import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('', 'PollsController.create')
  Route.get(':id', 'PollsController.get')
  Route.get(':id/votes', 'VotesController.get')
  Route.post(':id/votes', 'VotesController.create')
}).prefix('polls')
