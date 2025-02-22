import os
from flask import Flask, request, redirect, make_response
from flask_admin import Admin, AdminIndexView, expose
from flask_admin.contrib.sqla import ModelView
from backend.models import db, Usuario, Estado, TipoTrabajo, Trabajo, Cliente

# Clase personalizada para proteger el índice de Flask-Admin
class MyAdminIndexView(AdminIndexView):
    @expose('/')
    def index(self):
        # Verifica si el usuario ha iniciado sesión
        if not self.is_authenticated():
            return self.prompt_login()
        return super(MyAdminIndexView, self).index()

    def is_authenticated(self):
        # Obtiene las credenciales de las cookies
        username = request.cookies.get('admin_username')
        password = request.cookies.get('admin_password')
        
        if not username or not password:
            return False

        # Verifica en la base de datos
        usuario = Usuario.query.filter_by(nombre=username).first()
        if usuario and usuario.contrasena == password:
            return True
        return False

    def prompt_login(self):
        # Solicita usuario y contraseña mediante un formulario básico
        return """
        <form method="POST" action="/admin/login">
            <label for="username">Usuario:</label>
            <input type="text" id="username" name="username" required>
            <label for="password">Contraseña:</label>
            <input type="password" id="password" name="password" required>
            <button type="submit">Iniciar Sesión</button>
        </form>
        """

# Clase personalizada para proteger las vistas de los modelos
class SecureModelView(ModelView):
    def is_accessible(self):
        # Obtiene las credenciales de las cookies
        username = request.cookies.get('admin_username')
        password = request.cookies.get('admin_password')

        if not username or not password:
            return False

        # Verifica en la base de datos
        usuario = Usuario.query.filter_by(nombre=username).first()
        if usuario and usuario.contrasena == password:
            return True
        return False

def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'

    # Inicializa Flask-Admin con la vista personalizada
    admin = Admin(app, name='SDC Admin', template_mode='bootstrap3', index_view=MyAdminIndexView())

    # Agrega vistas protegidas para los modelos
    admin.add_view(SecureModelView(Usuario, db.session))
    admin.add_view(SecureModelView(Estado, db.session))
    admin.add_view(SecureModelView(TipoTrabajo, db.session))
    admin.add_view(SecureModelView(Trabajo, db.session))
    admin.add_view(SecureModelView(Cliente, db.session))

    # Ruta para manejar el inicio de sesión
    @app.route('/admin/login', methods=['POST'])
    def admin_login():
        username = request.form.get('username')
        password = request.form.get('password')

        # Verifica credenciales en la base de datos
        usuario = Usuario.query.filter_by(nombre=username).first()
        if usuario and usuario.contrasena == password:
            response = make_response(redirect('/admin/'))
            response.set_cookie('admin_username', username)
            response.set_cookie('admin_password', password)
            return response
        return "Credenciales inválidas. <a href='/admin/'>Intentar de nuevo</a>"

    # Ruta para cerrar sesión
    @app.route('/admin/logout', methods=['GET'])
    def admin_logout():
        response = redirect('/admin/')
        response.delete_cookie('admin_username')
        response.delete_cookie('admin_password')
        return response
