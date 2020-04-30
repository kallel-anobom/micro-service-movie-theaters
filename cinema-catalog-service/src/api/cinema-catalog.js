module.exports = (app, repository) => {

  app.get('/cities', (req, res, next) => {
    repository.getAllCities((err, cities) => {
      if(err) return next(err);

      res.json(cities);
    });
  })

  app.get('/cities/:city/movies', (req, res, next) => {
    const { city } = req.params;

    repository.getMoviesByCityId(city, (err, movies) => {
      if(err) return next(err);

      res.json(movies)
    });
  })

  app.get('/cities/:city/movies/:movie', (req, res, next) => {
    const { movie } = req.params;

    repository.getMovieSessionsByCityId(movie, req.params.city, (err, sessions) => {
      if(err) return next(err);

      res.json(sessions)
    });
  })

  app.get('/cities/:city/cinemas', (req, res, next) => {
    const { city } = req.params;

    repository.getCinemasByCityId(city, (err, cinemas) => {
      if(err) return next(err);
      res.json(cinemas)
    });
  })

  app.get('/cinemas/:cinema/movies', (req, res, next) => {
    const { cinema } = req.params;

    repository.getMoviesByCinemaId(cinema, (err, movies) => {
      if(err) return next(err);
      res.json(movies)
    });
  })

  app.get('/cinemas/:cinema/movies/:movie', (req, res, next) => {
    const { movie, cinema } = req.params;
    repository.getMovieSessionsByCinemaId(movie, cinema, (err, sessions) => {
      if(err) return next(err);
      
      res.json(sessions)
    });
  })
}