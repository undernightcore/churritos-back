import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('', 'PollsController.create')
  Route.get(':id', 'PollsController.get')
}).prefix('polls')
