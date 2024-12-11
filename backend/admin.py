import os
from flask_admin import Admin
from models import db, Usuario, Estado, TipoTrabajo, Trabajo, Cliente
from flask_admin.contrib.sqla import ModelView

def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'

    admin = Admin(app, name='SDC Admin', template_mode='bootstrap3')

    admin.add_view(ModelView(Usuario, db.session))
    admin.add_view(ModelView(Estado, db.session))
    admin.add_view(ModelView(TipoTrabajo, db.session))
    admin.add_view(ModelView(Trabajo, db.session))
    admin.add_view(ModelView(Cliente, db.session))

