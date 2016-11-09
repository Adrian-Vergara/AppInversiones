var Inversion = {

    _setIdUsuario: function (idUsuario) {
        localStorage.setItem('idUsuario', idUsuario);
    },
    _getIdUsuario: function () {
        return localStorage.idUsuario;
    },
    _setToken: function (token) {
        localStorage.setItem('token', token);
    },
    _getToken: function () {
        return localStorage.token;
    },
    _setNombreCompleto: function (nombreCompleto) {
        localStorage.setItem('nombreCompleto',nombreCompleto);
    },
    _getNombreCompleto: function () {
        return localStorage.nombreCompleto;
    },
    _getUrl: function() {
        return "http://businessview.azurewebsites.net/";
    },
    _setIdRol: function(idRol){
        localStorage.idRol = idRol;
    },
    _getIdRol: function(){
        return localStorage.idRol;
    },
    _setNombreRol: function(nombreRol){
        localStorage.nombreRol = nombreRol
    },
    _getNombreRol: function(){
        return localStorage.nombreRol;
    },
    _setUsername: function (username) {
        localStorage.Username = username;
    },
    _getUsername: function () {
        return localStorage.Username;
    }
};