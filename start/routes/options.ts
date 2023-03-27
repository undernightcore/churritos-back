import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get(':id/votes', 'VotesController.getByOption')
}).prefix('options')
