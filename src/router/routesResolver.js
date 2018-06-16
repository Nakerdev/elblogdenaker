window.NakerNoventa = window.NakerNoventa || {};

(NakerNoventa => {

    function routesResolver(routes){

        function getRouteSolver(route){
            return getRouteSolverIfThereIsAMatch(route)
                || getRouteSolverByDefault();
        }

        function getRouteSolverIfThereIsAMatch(route) {
            return routes.filter(x => x.route === route)[0];
        }

        function getRouteSolverByDefault () {
            return routes.filter(x => x.routeByDefault)[0];
        }

        return {
            getRouteSolver: getRouteSolver
        }
    }

    NakerNoventa.RoutesResolver = routesResolver;

})(window.NakerNoventa);